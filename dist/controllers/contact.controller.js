"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
class ContactController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_service_1.ContactService.createContact(req.body);
                res.status(201).json(contact);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to create contact" });
            }
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = 1, limit = 5 } = req.query;
                const contacts = yield contact_service_1.ContactService.getContacts(Number(page), Number(limit));
                res.json(contacts);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to fetch contacts" });
            }
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = yield contact_service_1.ContactService.updateContact(req.params.id, req.body);
                res.json(contact);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update contact" });
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield contact_service_1.ContactService.deleteContact(req.params.id);
                console.log(req.params.id);
                res.json({ message: "Contact deleted" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete contact" });
            }
        });
    }
}
exports.ContactController = ContactController;
