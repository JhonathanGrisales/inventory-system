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

  deleted(entity: string) {
    return {
      status: true,
      message: `${entity} deleted successfully`,
      message_es: `${entity} eliminado exitosamente`,
    };
  }

  retrieved(entity: string) {
    return {
      status: true,
      message: `${entity} retrieved successfully`,
      message_es: `${entity} obtenido exitosamente`,
    };
  }

  error(action_es: string, entity_es: string, action_en: string, entity_en: string, error) {
    return {
      status: false,
      message: `Error ${action_en} ${entity_en}`,
      message_es: `Error al ${action_es} ${entity_es}`,
      error: error.message
    };
  }
}
