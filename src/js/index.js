import 'bootstrap';
import '../sass/style.scss';
import ImageSelect from './classes/ImageSelect';

const imgPicker = new ImageSelect('.image-select');
imgPicker.addEvents();

