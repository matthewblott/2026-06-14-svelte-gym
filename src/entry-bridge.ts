// import { Application } from '@hotwired/stimulus';
// import { controllers } from '@joemasilotti/bridge-components';
//
// const application = Application.start();

import '$lib/hotwire/core'; // sets window.Turbo, window.HotwireNavigator
import { Application } from '@hotwired/stimulus';
import { controllers } from '@joemasilotti/bridge-components';

const application = Application.start();
application.load(controllers);
