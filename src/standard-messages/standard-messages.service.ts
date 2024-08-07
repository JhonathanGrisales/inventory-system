import { Injectable } from "@nestjs/common";
import { StringifyOptions } from "querystring";

@Injectable()
export class StandardMessagesService {
  created(entity_en: string, entity_es: string) {
    return {
      status: true,
      message: `${entity_en} created successfully`,
      message_es: `${entity_es} creado exitosamente`,
    };
  }

  updated(entity_en: string, entity_es: string) {
    return {
      status: true,
      message: `${entity_en} updated successfully`,
      message_es: `${entity_es} actualizado exitosamente`,
    };
  }

  deleted(entity_en: string, entity_es: string) {
    return {
      status: true,
      message: `${entity_en} deleted successfully`,
      message_es: `${entity_es} eliminado exitosamente`,
    };
  }

  retrieved(entity_en: string, entity_es: string, data: object ) {
    return {
      status: true,
      message: `${entity_en} retrieved successfully`,
      message_es: `${entity_es} obtenido exitosamente`,
      data
    };
  }

  error(action_es: string, entity_es: string, action_en: string, entity_en: string, error: any) {
    return {
      status: false,
      message: `Error ${action_en} ${entity_en}`,
      message_es: `Error  ${action_es} ${entity_es}`,
      error: error.message
    };
  }
}
