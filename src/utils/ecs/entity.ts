import { IComponent } from '@/utils';
import { IAwake, IUpdate } from '@/utils';

/**
 * Generic constructor definition to find components.
 */
type constr<T> = { new (...args: unknown[]): T };

/**
 * Base class for entities.
 */
export abstract class Entity implements IAwake, IUpdate {
  /**
   * Entity components list.
   */
  protected _components: IComponent[] = [];

  /**
   * Get entity components list.
   * @returns {IComponent[]} Entity components list.
   */
  public get getComponents(): IComponent[] {
    return this._components;
  }

  /**
   * Add a component to entity components list.
   * @param {IComponent} component Component to add.
   */
  public addComponent(component: IComponent): void {
    this._components.push(component);
    component.entity = this;
  }

  /**
   * Get a specific component from entity components list.
   * @param {constr<T>} constr Component constructor.
   * @returns {C} Component.
   */
  public getComponent<C extends IComponent>(constr: constr<C>): C {
    for (const component of this._components) {
      if (component instanceof constr) {
        return component as C;
      }

      continue;
    }

    throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`);
  }

  /**
   * Remove a specific component from entity components list.
   * @param {constr<T>} constr Component constructor.
   */
  public removeComponent<C extends IComponent>(constr: constr<C>): void {
    let toRemove: IComponent | undefined;
    let index: number | undefined;

    for (let i = 0; i < this._components.length; i++) {
      const component = this._components[i];
      if (component instanceof constr) {
        toRemove = component;
        index = i;
        break;
      }
    }

    if (toRemove && index) {
      toRemove.entity = null;
      this._components.splice(index, 1);
    }
  }

  /**
   * Indicates if component exists in entity components list.
   * @param {constr<T>} constr Component constructor.
   * @returns {boolean} Search status.
   */
  public hasComponent<C extends IComponent>(constr: constr<C>): boolean {
    for (const component of this._components) {
      if (component instanceof constr) {
        return true;
      }
    }

    return false;
  }

  /**
   * Manage entity awake lifecycle.
   */
  public awake(): void {
    for (const component of this._components) {
      component.awake();
    }
  }

  /**
   * Manage entity update lifecycle.
   * @param {number} deltaTime Time elapsed from last frame.
   */
  public update(deltaTime: number): void {
    for (const component of this._components) {
      component.update(deltaTime);
    }
  }
}
