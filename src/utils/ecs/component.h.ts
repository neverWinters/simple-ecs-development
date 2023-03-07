import { Entity } from '@/utils';
import { IAwake, IUpdate } from '@/utils';

/**
 * Base interface for components.
 */
export interface IComponent extends IAwake, IUpdate {
  /**
   * Component associated entity.
   */
  entity: Entity | null;
}
