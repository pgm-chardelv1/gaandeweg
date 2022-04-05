import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  async create(@Body() createModuleDto: CreateModuleDto) {
    const module = await this.modulesService.create(createModuleDto);
    return {
      statusCode: 201,
      message: 'Module created successfully',
      module,
    };
  }

  @Get()
  async findAll() {
    const modules = await this.modulesService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Modules found successfully',
      modules,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const module = await this.modulesService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Module found successfully',
      module,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto
  ) {
    const module = await this.modulesService.update(+id, updateModuleDto);
    return {
      statusCode: 204,
      message: 'Module updated successfully',
      module,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const module = await this.modulesService.remove(+id);
    return {
      statusCode: 204,
      message: 'Module removed successfully',
      module,
    };
  }
}
