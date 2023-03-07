/**
 * Interface to manage awake lifecycle.
 */
export interface IAwake {
  /**
   * Manage awake lifecycle.
   */
  awake(): void;
}

/**
 * Interface to manage update lifecycle.
 */
export interface IUpdate {
  /**
   * Manage update lifecycle.
   * @param {number} deltaTime Time elapsed from last frame.
   */
  update(deltaTime: number): void;
}
