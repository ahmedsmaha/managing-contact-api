import {IContact} from "../models/contact.model";

interface Pagination {
    page: number;
    totalPages: number;
    totalContacts: number;
    contacts:IContact[];
}

export {Pagination};