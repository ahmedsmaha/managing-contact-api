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
exports.ContactService = void 0;
const contact_model_1 = require("../models/contact.model");
class ContactService {
    static createContact(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield contact_model_1.Contact.create(data);
        });
    }
    static getContacts(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalContacts = yield contact_model_1.Contact.countDocuments();
            const totalPages = Math.ceil(totalContacts / limit);
            const contacts = yield contact_model_1.Contact.find()
                .skip((page - 1) * limit)
                .limit(limit);
            return {
                page,
                totalPages,
                totalContacts,
                contacts
            };
        });
    }
    static updateContact(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.findByIdAndUpdate(id, data, { new: true });
        });
    }
    static deleteContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield contact_model_1.Contact.findByIdAndDelete(id);
        });
    }
    static lockContact(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.findByIdAndUpdate(id, { lockedBy: userId }, { new: true });
        });
    }
    static unlockContact(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.findByIdAndUpdate(id, { lockedBy: null }, { new: true });
        });
    }
}
exports.ContactService = ContactService;
