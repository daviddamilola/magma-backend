import express from 'express';
import RequestController from '../controllers/RequestController';
import validation from '../middlewares/validation';
import requestValidations from '../middlewares/requestValidations';
import Auth from '../middlewares/Auth';

const { userAuth } = Auth;editTrip
const { bookTrip, userTripRequests, deleteTrip, editTrip } = RequestController;
const { validateTrip, validateTripRequest, validateDelete, validateOpenTrip } = requestValidations;

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

requestRoute.patch(
  '/requests/:id',
  userAuth,
  validation.validate('request'),
  validateTrip,
  validateOpenTrip,
  editTrip
);

export default requestRoute;
