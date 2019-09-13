import express from 'express';
import RequestController from '../controllers/RequestController';
import validation from '../middlewares/validation';
import requestValidations from '../middlewares/requestValidations';
import Auth from '../middlewares/Auth';

const { userAuth } = Auth;
const { bookTrip, userTripRequests, deleteTrip } = RequestController;
const { validateTrip, validateTripRequest, validateDelete } = requestValidations;

const requestRoute = express.Router();

requestRoute.post(
  '/requests',
  userAuth,
  validation.validate('request'),
  validateTrip,
  validateTripRequest,
  bookTrip
);
requestRoute.delete(
  '/requests/:id',
  userAuth,
  validation.validateParam('id'),
  validateDelete,
  deleteTrip
);

requestRoute.get(
  '/requests',
  Auth.userAuth,
  userTripRequests
);

export default requestRoute;
