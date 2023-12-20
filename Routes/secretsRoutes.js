// secretsRoutes.js
import express from 'express';
import * as secretsController from '../controller/secretsController.js';
import {islogged,} from'../middleware/auth.js'
const router = express.Router();

router.get('/secrets', islogged, secretsController.renderSecrets);

router.get('/submit', secretsController.renderSubmit);

router.post('/submit', secretsController.submitSecret);

//  router.get('/logout', secretsController.logoutUser);

router.get('/logout', (req, res) => {
    req.logout((err) => {
    res.redirect('/login');
    });
  });


export default router;