import { Router } from 'express';
import {
  createOptionValue,
  getOptionValues,
  getOptionValueById,
  updateOptionValue,
  deleteOptionValue
} from '../services/OptionValuesServices';

const router:Router = Router();

router.post('/', createOptionValue);
router.get('/', getOptionValues);
router.get('/:id', getOptionValueById);
router.put('/:id', updateOptionValue);
router.delete('/:id', deleteOptionValue);

export default router;
