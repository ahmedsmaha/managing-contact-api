import { Request, Response } from "express";
import { ContactService } from "../services/contact.service";
import {CRequest} from "../interfaces/CRequest.interface";

class ContactController {
    static async create(req: CRequest, res: Response): Promise<void> {
        try {
            const contact = await ContactService.createContact(req.body);
            res.status(201).json(contact);
        } catch (error) {
            res.status(500).json({ error: "Failed to create contact" });
        }
    }

    static async list(req: CRequest, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 5 } = req.query;
            const contacts = await ContactService.getContacts(Number(page), Number(limit));
            res.json(contacts);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch contacts" });
        }
    }

    static async update(req: CRequest, res: Response): Promise<void> {
        try {
            const contact = await ContactService.updateContact(req.params.id, req.body);
            res.json(contact);
        } catch (error) {
            res.status(500).json({ error: "Failed to update contact" });
        }
    }

    static async delete(req: CRequest, res: Response): Promise<void> {
        try {
            await ContactService.deleteContact(req.params.id);
            console.log(req.params.id)
            res.json({ message: "Contact deleted" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete contact" });
        }
    }
}

export { ContactController };
