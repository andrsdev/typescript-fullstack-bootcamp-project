import { Router } from 'express';
import {
  createVariant,
  getVariants,
  getVariantById,
  updateVariant,
  deleteVariant
} from '../services/VariantServices';

const router: Router = Router();

router.post('/', createVariant);
router.get('/', getVariants);
router.get('/:id', getVariantById);
router.put('/:id', updateVariant);
router.delete('/:id', deleteVariant);

export default router;