import express from 'express' //this is not same as in index.js
import { userCreate,getUser,deleteUser,updateUser,mailer,forgotPassword} from '../controller/user.js'; //specific
import { checkToken, checkUserUpDel } from '../utils/checkToken.js';

// path=/create
const router=express.Router()

//user create
router.post('/create',userCreate);

//user find
router.get('/create',checkToken,getUser);



// router.delete('/update/:key',checkToken,deleteUser) //key contain value of id given in path(params)
// router.put('/update/:key',checkToken,updateUser);


router.delete('/update/:key',checkUserUpDel,deleteUser) 
router.put("/update/:key",checkUserUpDel,updateUser);

router.post('/mail',mailer);
router.post('/forgotPassword',forgotPassword);
// router.post('/resetPassword',);
export default router;