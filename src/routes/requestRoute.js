import express from 'express';
import RequestController from '../controllers/RequestController';
import validation from '../middlewares/validation';
import requestValidations from '../middlewares/requestValidations';
import Auth from '../middlewares/Auth';

const requestRoute = express.Router();

requestRoute.post(
  '/requests',
  Auth.userAuth,
  validation.validate('request'),
  validation.validateChildRequests,
  requestValidations.validateChildRequest,
  requestValidations.validateTrip,
  requestValidations.validateTripRequest,
  RequestController.bookTrip
);
requestRoute.delete(
  '/requests/:id',
  Auth.userAuth,
  validation.validateParam('id'),
  requestValidations.validateDelete,
  RequestController.deleteTrip
);

requestRoute.get(
  '/requests',
  Auth.userAuth,
  RequestController.userTripRequests
);

requestRoute.patch(
  '/requests/:id',
  Auth.userAuth,
  validation.validate('patchRequest'),
  requestValidations.validateTrip,
  requestValidations.validateOpenTrip,
  RequestController.editTrip
);

export default requestRoute;
