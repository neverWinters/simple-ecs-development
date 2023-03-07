import { Entity, IComponent } from '@/utils';

class E extends Entity { }

class C1 implements IComponent {
    public entity: E;
    public awake(): void { }
    public update(deltaTime: number): void { }
}

class C2 implements IComponent {
    public entity: E;
    public awake(): void { }
    public update(deltaTime: number): void { }
}

class C3 implements IComponent {
    public entity: E;
    public awake(): void { }
    public update(deltaTime: number): void { }
}

describe('>>> Entity', () => {
    let e: E;
    const c1 = new C1();
    const c2 = new C2();
    const c3 = new C3();

    beforeEach(() => {
        e = new E();
    });

    it('Should add components.', () => {
        expect(e.getComponents.length).toBe(0);
        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);
        expect(e.getComponents[0]).toBe(c1);
        expect(e.getComponents[1]).toBe(c2);
        expect(e.getComponents[2]).toBe(c3);
    });

    it('Should remove components.', () => {
        expect(e.getComponents.length).toBe(0);
        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);
        e.removeComponent(C2);
        expect(e.getComponents.length).toBe(2);
        expect(e.getComponents[0]).toBe(c1);
        expect(e.getComponents[1]).toBe(c3);
    });

    it('Should get components.', () => {
        expect(e.getComponents.length).toBe(0);
        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);
        expect(e.getComponent(C1)).toBe(c1);
        expect(e.getComponent(C2)).toBe(c2);
        expect(e.getComponent(C3)).toBe(c3);
    });

    it('Should check components.', () => {
        expect(e.getComponents.length).toBe(0);
        e.addComponent(c1);
        e.addComponent(c3);
        expect(e.hasComponent(C1)).toBeTruthy();
        expect(e.hasComponent(C2)).toBeFalsy();
        expect(e.hasComponent(C3)).toBeTruthy();
    });

    it('Should throw error if component was not found.', () => {
        expect(e.hasComponent(C1)).toBeFalsy();
        expect(() => e.getComponent(C1)).toThrow();
    });

    it('Should awake all components.', () => {
        const spy1 = jest.spyOn(c1, 'awake');
        const spy2 = jest.spyOn(c2, 'awake');
        const spy3 = jest.spyOn(c3, 'awake');
        expect(spy1).not.toBeCalled();
        expect(spy2).not.toBeCalled();
        expect(spy3).not.toBeCalled();
        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);
        e.awake();
        expect(spy1).toBeCalled();
        expect(spy2).toBeCalled();
        expect(spy3).toBeCalled();
    });

    it('Should update all components.', () => {
        const spy1 = jest.spyOn(c1, 'update');
        const spy2 = jest.spyOn(c2, 'update');
        const spy3 = jest.spyOn(c3, 'update');
        expect(spy1).not.toBeCalled();
        expect(spy2).not.toBeCalled();
        expect(spy3).not.toBeCalled();
        e.addComponent(c1);
        e.addComponent(c2);
        e.addComponent(c3);
        const deltaTime: number = 12;
        e.update(deltaTime);
        expect(spy1).toBeCalledWith(deltaTime);
        expect(spy2).toBeCalledWith(deltaTime);
        expect(spy3).toBeCalledWith(deltaTime);
    });
});