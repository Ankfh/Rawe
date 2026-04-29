import ReaderQAScreen from '../../features/QA/view/ReaderQAScreen';
import UploadView from '../../features/Upload/view/UploadView';

const privateRoute = [
  {
    name: 'ReaderQA',
    component: ReaderQAScreen,
  },

  {
    name: 'UploadBook',
    component: UploadView,
  },
];

export default privateRoute;
