import { Request, Response } from 'express';
import { OptionValueService } from '../services/OptionValueService';

export class OptionValueController {
  private optionValueService: OptionValueService;

  constructor() {
    this.optionValueService = new OptionValueService();
  }

  async getAllOptionValues(req: Request, res: Response): Promise<void> {
    try {
      const optionValues = await this.optionValueService.getAllOptionValues();
      res.json(optionValues);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los valores de opción', error });
    }
  }

  async getOptionValueById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const optionValue = await this.optionValueService.getOptionValueById(Number(id));

      if (!optionValue) {
        res.status(404).json({ message: 'Valor de opción no encontrado' });
        return;
      }

      res.json(optionValue);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el valor de opción', error });
    }
  }

  async createOptionValue(req: Request, res: Response): Promise<void> {
    try {
      const optionValueData = req.body;
      const newOptionValue = await this.optionValueService.createOptionValue(optionValueData);
      res.status(201).json(newOptionValue);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear el valor de opción', error });
    }
  }

  async updateOptionValue(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const optionValueData = req.body;

      const updatedOptionValue = await this.optionValueService.updateOptionValue(Number(id), optionValueData);
      res.json(updatedOptionValue);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar el valor de opción', error });
    }
  }

  async deleteOptionValue(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.optionValueService.deleteOptionValue(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el valor de opción', error });
    }
  }
}
