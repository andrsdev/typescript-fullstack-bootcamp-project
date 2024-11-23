import { Request, Response } from 'express';
import { OptionService } from '../services/OptionService';

export class OptionController {
  private optionService: OptionService;

  constructor() {
    this.optionService = new OptionService();
  }

  async getAllOptions(req: Request, res: Response): Promise<void> {
    try {
      const options = await this.optionService.getAllOptions();
      res.json(options);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener las opciones', error });
    }
  }

  async getOptionById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const option = await this.optionService.getOptionById(Number(id));

      if (!option) {
        res.status(404).json({ message: 'Opción no encontrada' });
        return;
      }

      res.json(option);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener la opción', error });
    }
  }

  async createOption(req: Request, res: Response): Promise<void> {
    try {
      const optionData = req.body;
      const newOption = await this.optionService.createOption(optionData);
      res.status(201).json(newOption);
    } catch (error) {
      res.status(400).json({ message: 'Error al crear la opción', error });
    }
  }

  async updateOption(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const optionData = req.body;

      const updatedOption = await this.optionService.updateOption(Number(id), optionData);
      res.json(updatedOption);
    } catch (error) {
      res.status(400).json({ message: 'Error al actualizar la opción', error });
    }
  }

  async deleteOption(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.optionService.deleteOption(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar la opción', error });
    }
  }
}
