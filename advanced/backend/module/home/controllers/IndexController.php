<?php

namespace backend\module\home\controllers;

use yii\db\Exception;
use yii\web\Controller;
use yii\common\models\User;
use yii\web\Response;
use yii\web\Request;
use yii\db\Query;
use yii\db\ActiveRecord;
use yii\helpers\ArrayHelper;
use yii\filters\Cors;
use yii\behaviors\TimestampBehavior;

/**
 * Default controller for the `home` module
 */
class IndexController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        return "Home";
    }
    /*
    *提前处理：密码加密，检查username重复，token加工
     */
    /*
    *加密
     */
    public function PasswordEncry($password,$encryptedData="zhouqing")
    {
        $en = \Yii::$app->getSecurity()->encryptByPassword($password,$encryptedData);
        return base64_encode($en);
    }
    /*
    *校验
     */
//    public function PasswordInvild($password,$encryptedData="zhouqing")
//    {
////        return \Yii::$app->security->validatePassword($password,$encryptedData);
//
//    }
    /*
     * 解密
     */
    public function PasswordDecry($password,$encryptedData="zhouqing")
    {
        $de = \Yii::$app->getSecurity()->decryptByPassword(base64_decode($password),$encryptedData);
        return $de;
    }

    /*
    *查找用户名
     */
    public function UsernameQuery($name)
    {
    	$query = (new Query())
    		->select('*')
    		->from('user')
    		->Where(['username'=> $name])
    		->andWhere(['status'=> 1])
    		->one();
    	if($query==null)
    	{
    		return array("data"=>[],"msg"=>"No");
    	}
    	else
    	{
//    	    return $query;
    		return array("data"=>$query,"msg"=>"Yes");
    	}

    }
    /*
    * 注册
     */
    public function actionRegister()
    {

    	$request = \Yii::$app->request;
    	$username = $request->post('username');
    	$password = $request->post('password');
//    	$password1 = $request->post('password1');
//    	if($password != $password1)
//    	{
//    		return array("data"=>[$password,$password1],"msg"=>"两次输入密码不一致");
//    	}
    	if($this->UsernameQuery($username)['msg']=='No')
    	{
    		$passwordE = $this->PasswordEncry($password);
    		$role = 3;
    		$status = 1;
    		$queryid  = (new Query())
    				->select('*')
    				->from('user')
    				->andWhere(['status' =>1])
                    ->count();
    		$id = $queryid +1;
    		$insertU = \Yii::$app->db->createCommand()->insert('user',array('id'=>$id,'username'=>$username,'password'=>$passwordE,'role'=>$role,'status'=>$status))->execute();
    		if($insertU)
    		{
    			return array("data"=>[$username,$passwordE],"msg"=>"注册成功");
    		}
    		else
    		{
    			return array("data"=>[$username,$passwordE],"msg"=>"注册失败");
    		}

    	}
    	else
    	{
    		return array("data"=>[],"msg"=>"该用户名已存在");
    	}
    }
    /*
    * 忘记密码
     */
    public function actionForget()
    {
    	$request = \Yii::$app->request;
    	$username = $request->post('username');
    	$password = $request->post('password');
//    	$query =$this->UsernameQuery($username);
        $query = (new Query())
            ->select('*')
            ->from('user')
            ->Where(['username'=> $username])
            ->andWhere(['status'=> 1])
            ->one();
    	if($query!=null)
    	{
    		$passwordE = $this->PasswordEncry($password);
    		$id =$query['id'];
            $updateU = \Yii::$app->db->createCommand()->update('user', ['password' => $passwordE], 'id=:id',[':id'=>$id])->execute();
            if($updateU)
            {
                return array("data"=>[$username,$passwordE],"msg"=>"修改密码成功");
            }
            else
            {
                return array("data"=>[$username,$passwordE],"msg"=>"修改密码不成功");
            }
    	}
    	else
    	{
    		return array("data"=>[],"msg"=>"该用户名尚未注册！不能找回密码");
    	}

    }
    //生成token
    public function generateAccessToken()
    {
//        $this->token = \Yii::$app->security->generateRandomString();
        return \Yii::$app->security->generateRandomString();
    }
    /*
    * 登录
     */
    public function actionLogin()
    {
    	$request = \Yii::$app->request;
    	$username = $request->post('username');
    	$password = $request->post('password');
        $query = (new Query())
            ->select('*')
            ->from('user')
            ->Where(['username'=> $username])
            ->andWhere(['status'=> 1])
            ->one();
    	if($query != null)
    	{
    	    $sqlPassword = $this->PasswordDecry($query['password']);
    	    if($sqlPassword===$password)
            {
                $token = $this->generateAccessToken();
                $id = $query['id'];
                $updateU = \Yii::$app->db->createCommand()->update('user', ['token' => $token], 'id=:id',[':id'=>$id])->execute();
                if($updateU)
                {
//                    return array("data"=>[$username,$password,$token],"msg"=>"登录成功");
                    return array("data"=>$query,"msg"=>"登录成功");
                }
                else
                {
                    return array("data"=>[$username,$password],"msg"=>"登录成功中，token加载失败");
                }
            }
            else
            {
                return array("data" =>[$username,$password,$sqlPassword],"msg"=>"密码错误，登录失败");
            }
    	}
    	else
    	{
    		return array("data"=>[$username,$password],"msg"=>"该用户不存在");
    	}
    }
    /*
    * 注销
     */
    public function actionLogout()
    {
        //改变token
        $request = \Yii::$app->request;
        $username = $request->post('username');
        $query = (new Query())
            ->select('*')
            ->from('user')
            ->Where(['username'=> $username])
            ->andWhere(['status'=> 1])
            ->one();
        if($query !=null)
        {
            $token ="";
            $id = $query['id'];
            $updateU = \Yii::$app->db->createCommand()->update('user', ['token' => $token], 'id=:id',[':id'=>$id])->execute();
            if($updateU)
            {
                return array("data"=>[$username],"msg"=>"退出成功");
            }
            else{
                return array("data"=>[$username],"msg"=>"退出时，token失败");
            }
        }
        else{
            return array("data"=>[$username],"msg"=>"退出时，没有找到相应的用户");
        }

    }
    /*
     * ceshi
     */
    public function actionTest()
    {
//        $password = "123456";
//        $en = $this->PasswordEncry($password);
//        $de = $this->PasswordDecry($en);
//        return array("data"=>[$en,$de,$password],"msg"=>"ceshi");
        $s = $this->UsernameQuery('zhouqing');
        return $s;
    }

}
