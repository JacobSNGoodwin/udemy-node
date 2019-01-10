const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, {req}) => {
        if (value === 'test@test.com') {
          throw new Error('This email address is verboten!');
        }
        return true;
      }),
    body(
      'password',
      'Please enter an alphanumeric password with at least 5 characters.'
    )
      .isLength({min: 5})
      .isAlphanumeric(), // for demonstration only,
    body('confirmPassword').custom((value, { req }) => {
      if(value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    })
  ],
  authController.postSignup
  );

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;