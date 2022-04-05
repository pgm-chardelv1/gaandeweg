import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Module } from './entities/module.entity';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(Module)
    private readonly moduleRepository: Repository<Module>
  ) {}

  async create(createModuleDto: CreateModuleDto) {
    try {
      const module = this.moduleRepository.create(createModuleDto);
      await this.moduleRepository.save(module);
      if (!module) {
        throw new BadRequestException('Module could not be created');
      }
      return module;
    } catch (error) {
      Logger.log(`Could not create module. ${error}`);
    }
  }

  findAll() {
    try {
      const modules = this.moduleRepository.find();
      return modules;
    } catch (err) {
      Logger.log(`Could not find modules. ${err}`);
    }
  }

  findOne(id: number) {
    try {
      const module = this.moduleRepository.findOne(id);
      if (!module) {
        throw new BadRequestException('Module could not be found');
      }
      return module;
    } catch (err) {
      Logger.log(`Could not find module. ${err}`);
    }
  }

  async update(id: number, updateModuleDto: UpdateModuleDto) {
    try {
      const module = await this.moduleRepository.findOne(id);
      if (!module) {
        throw new BadRequestException('Module could not be found.');
      } else {
        const updatedModule = this.moduleRepository.merge(
          module,
          updateModuleDto
        );
        await this.moduleRepository.save(updatedModule);
      }
    } catch (err) {
      Logger.log(`Could not update module. ${err}`);
    }
  }

  async remove(id: number) {
    try {
      const module = await this.moduleRepository.findOne(id);
      if (!module) {
        throw new BadRequestException('Module could not be found');
      } else {
        await this.moduleRepository.remove(module);
      }
      return module;
    } catch (err) {
      Logger.log(`Could not remove module. ${err}`);
    }
  }
}
