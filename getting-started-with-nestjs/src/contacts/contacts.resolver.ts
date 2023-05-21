// import { Controller } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { ContactsService } from './contacts.service';
// import { CreateContactDto } from './dto/create-contact.dto';
// import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { CreateContactsInput, UpdateContactsInput } from 'src/graphql';

@Resolver('contacts')
export class ContactsResolver {
  constructor(private readonly contactsService: ContactsService) {}

  @Query(() => [Contact])
  async contacts() {
    return await this.contactsService.findAll();
  }

  @Query(() => Contact)
  async contact(@Args('_id') _id: string) {
    return await this.contactsService.findById(_id);
  }

  @Mutation(() => Contact)
  async createContact(@Args('input') input: CreateContactsInput) {
    return await this.contactsService.create(input);
  }

  @Mutation(() => Contact)
  async updateContact(
    @Args('_id') _id: string,
    @Args('input') input: UpdateContactsInput,
  ) {
    return await this.contactsService.update(_id, input);
  }

  @Mutation(() => Boolean)
  async deleteContact(@Args('_id') _id: string) {
    return await this.contactsService.delete(_id);
  }

  // @Mutation(() => Boolean)
  // async deleteSites() {
  //   return await this.contactsService.deleteAll();
  // }

  // @Post()
  // create(@Body() createContactDto: CreateContactDto) {
  //   return this.contactsService.create(createContactDto);
  // }

  // @Get()
  // findAll() {
  //   return this.contactsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.contactsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
  //   return this.contactsService.update(+id, updateContactDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.contactsService.remove(+id);
  // }
}
