// import { Injectable } from '@nestjs/common';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';

// @Injectable()
// export class ContactsService {
//   create(createContactDto: CreateContactDto) {
//     return 'This action adds a new contact';
//   }

//   findAll() {
//     return `This action returns all contacts`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} contact`;
//   }

//   update(id: number, updateContactDto: UpdateContactDto) {
//     return `This action updates a #${id} contact`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} contact`;
//   }
// }

import { Injectable } from '@nestjs/common';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Contact } from './entities/contact.entity';
import { CreateContactsInput, UpdateContactsInput } from 'src/graphql';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: MongoRepository<Contact>,
  ) {}

  async findAll() {
    return await this.contactRepository.find({
      cache: true,
    });
  }

  async findById(_id: string): Promise<Contact> {
    return await this.contactRepository.findOne({
      where: {
        _id: _id,
      },
    });
  }

  async create(input: CreateContactsInput): Promise<Contact> {
    const { name, email, message, subject } = input;

    const contact = new Contact();
    contact.name = name;
    contact.email = email;
    contact.message = message;
    contact.subject = subject;

    return await this.contactRepository.save(contact);
  }

  async update(_id: string, input: UpdateContactsInput): Promise<boolean> {
    const { name, email, message, subject } = input;

    const contact = await this.contactRepository.findOne({
      where: {
        _id: _id,
      },
    });
    contact.name = name;
    contact.email = email;
    contact.message = message;
    contact.subject = subject;

    return (await this.contactRepository.save(contact)) ? true : false;
  }

  async delete(_id: string): Promise<boolean> {
    const site = await this.contactRepository.findOne({
      where: {
        _id: _id,
      },
    });
    return (await this.contactRepository.remove(site)) ? true : false;
  }

  // async deleteAll(): Promise<boolean> {
  //   return (await this.contactRepository.deleteMany({})) ? true : false;
  // }
}
