import { Router } from 'express';
import {
  createOption,
  getOptions,
  getOptionById,
  updateOption,
  deleteOption
} from '../services/OptionsServices';

const router: Router = Router();

router.post('/', createOption);
router.get('/', getOptions);
router.get('/:id', getOptionById);
router.put('/:id', updateOption);
router.delete('/:id', deleteOption);

export default router;
