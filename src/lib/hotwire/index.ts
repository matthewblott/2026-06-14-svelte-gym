import './core';
import { Application } from '@hotwired/stimulus';
import BackController from './controllers/bridge/back_controller'; 
import ButtonController from './controllers/bridge/button_controller'; 
import SessionController from './controllers/bridge/session_controller';

const application = Application.start();

application.register('bridge--back', BackController);
application.register('bridge--button', ButtonController);
application.register('bridge--session', SessionController);

