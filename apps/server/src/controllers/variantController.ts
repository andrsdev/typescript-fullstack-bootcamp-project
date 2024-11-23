import { Request, Response } from 'express';
import { VariantService } from '../services/VariantService';

export class VariantController {
  private variantService: VariantService;

  constructor() {
    this.variantService = new VariantService();
  }

  async getAllVariants(req: Request, res: Response): Promise<void> {
    try {
      const variants = await this.variantService.getAllVariants();
      res.json(variants);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las variantes', error });
    }
  }

  async getVariantById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const variant = await this.variantService.getVariantById(Number(id));

      if (!variant) {
        res.status(404).json({ message: 'Variante no encontrada' });
        return;
      }

      res.json(variant);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la variante', error });
    }
  }

  async createVariant(req: Request, res: Response): Promise<void> {
    try {
      const variantData = req.body;
      const newVariant = await this.variantService.createVariant(variantData);
      res.status(201).json(newVariant);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la variante', error });
    }
  }

  async updateVariant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const variantData = req.body;

      const updatedVariant = await this.variantService.updateVariant(Number(id), variantData);
      res.json(updatedVariant);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la variante', error });
    }
  }

  async deleteVariant(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.variantService.deleteVariant(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la variante', error });
    }
  }
}
