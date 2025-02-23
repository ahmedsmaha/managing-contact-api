import { Contact, IContact } from "../models/contact.model";

class ContactService {
    static async createContact(data: IContact): Promise<IContact> {
        return await Contact.create(data);
    }

    static async getContacts(page: number, limit: number): Promise<{page: number, totalPages: number,totalContacts: number, contacts:IContact[]}> {
        const totalContacts:number = await Contact.countDocuments();
        const totalPages:number = Math.ceil(totalContacts / limit);
        const contacts:IContact[] = await Contact.find()
            .skip((page - 1) * limit)
            .limit(limit);
        return {
            page,
            totalPages,
            totalContacts,
            contacts
        };
    }

    static async updateContact(id: string, data: Partial<IContact>): Promise<IContact | null> {
        return Contact.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteContact(id: string): Promise<void> {
        await Contact.findByIdAndDelete(id);
    }

    static async lockContact(id: string, userId: string): Promise<IContact | null> {
        return Contact.findByIdAndUpdate(id, { lockedBy: userId }, { new: true });
    }

    static async unlockContact(id: string): Promise<IContact | null> {
        return Contact.findByIdAndUpdate(id, { lockedBy: null }, { new: true });
    }
}

export { ContactService };
