<template>
  <div></div>
</template>
<script lang="ts">
  // 参考 TypeScript 文档：https://www.tslang.cn/docs/handbook/basic-types.html
  // 参考组合式API：https://v3.cn.vuejs.org/api/composition-api.html
  import { defineComponent } from "vue";

  export default defineComponent({
    setup() {
      /**
       * 映射类型
       */
      interface Personal {
        age: number;
      }
      // 定义了一个 ReadonlyType<T> 映射类型
      type ReadonlyType < T > = { readonly[P in keyof T]: T[P] };
      type ReadonlyInfo = ReadonlyType < Personal > ;
      let Personal: ReadonlyInfo = {
        age: 18
      };
      console.log("定义一个 ReadonlyType<T> 映射类型", Personal);

      /**
       * 定义类型别名
       */

      // 1、使用 type 关键字
      type TypeString = string;
      let str: TypeString;
      // str = 123; // error Type '123' is not assignable to  type 'string'

      // 2、类型别名也可以使用泛型
      type PositionType < T > = { x: T;y: T };
      const position1: PositionType < number > = {
        x: 1,
        y: -1
      };
      const position2: PositionType < string > = {
        x: "right",
        y: "top"
      };

      /**
       * 泛型
       */
      const getArray = < T > (value: T, times: number = 5): T[] => {
        return new Array(times).fill(value);
      };
      const arr1 = getArray < number[] > ([1, 2], 3);
      console.log("🚀 泛型 getArray<number[]>([1, 2], 3) 返回", arr1);
      const arr2 = getArray < number > (2);
      console.log("🚀 泛型 getArray<number>(2) 返回", arr2);

      // 指定多个泛型
      const getArray2 = < T,
        U > (param1: T, param2: U, times: number): [T, U][] => {
          return new Array(times).fill([param1, param2]);
        };
      getArray2(1, "a", 3).forEach(item => {
        // console.log(item); // [[1, "a"],[1, "a"],[1, "a"]]
        // console.log(item[0].length); // error 类型“number”上不存在属性“length”
        // console.log(item[1].toFixed(2)); // error 属性“toFixed”在类型“string”上不存在
      });

      /**
       * 装饰器：本身其实就是一个函数，理论上忽略参数的话，任何函数都可以当做装饰器使用
       */
      function helloWord(target: any) {
        console.log('hello Word!', target);
      }

      @helloWord
      class HelloWordClass {

      }
      /**
       * 装饰器组合
       * 多个装饰器，会先执行装饰器工厂函数获取所有装饰器，然后再从后往前执行装饰器的逻辑
       */

      function setName() {
        console.log("get setName");
        return function (target: string) {
          console.log("setName", target);
        };
      }

      function setAge() {
        console.log("get setAge");
        return function (target: number) {
          console.log("setAge", target);
        };
      }
      @setName()
      @setAge()
      class Test {}
      // 打印出来的内容如下，注意顺序：
      //     '装饰器工厂 setName'
      //     '装饰器工厂 setAge'
      //     '装饰器 setAge'
      //     '装饰器 setName'

      // 类装饰器：重载构造函数的例子
      function classDecorator < T extends { new(...args: any[]): {} } > (target: T) {
        return class extends target {
          newProperty = "new property";
          hello = "override";
        };
      }
      @classDecorator
      class Greeter {
        property = "property";
        hello: string;
        constructor(m: string) {
          this.hello = m;
        }
      }
      console.log("重载构造函数 Greeter", new Greeter("world"));
      // {
      //     hello: "override"
      //     newProperty: "new property"
      //     property: "property"
      // }

      function addAge(args: number) {
        return function (target: Function) {
          target.prototype.age = args;
        };
      }
      // 方法装饰器
      function method(target: any, propertykey: string, descriptor: PropertyDescriptor) {
        console.log("target", target);
        console.log("propertykey", propertykey);
        console.log("descriptor", descriptor);
      }
      @addAge(18)
      class Hello {
        name: string;
        age!: number;
        constructor() {
          console.log('hello');
          this.name = 'yugo';
          // this.age = 10
        }
        @method
        hello() {
          return "instance method"
        }
        @method
        static shello() {
          return "static method"
        }
      }

      // 属性装饰器
      function printPropertyName(target: any, propertyName: string) {
        console.log("属性装饰器：", propertyName);
      }
      class Infod {
        @printPropertyName
        name!: string;
        @printPropertyName
        age!: number;
      }

      // 参数装饰器
      function required(target: any, propertName: string, index: number) {
        console.log(`参数装饰器：修饰的是${propertName}的第${index + 1}个参数`);
      }
      class Info {
        name: string = "lison";
        age: number = 18;
        getInfo(prefix: string, @required infoType: string): any {
          return prefix + " " + this[infoType];
        }
      }
      interface Info {
        [key: string]: string | number | Function;
      }
      const info = new Info();
      info.getInfo("hihi", "age"); // 修饰的是getInfo的第2个参数


      // 访问器装饰器
      function addDecorator(
        target: any,
        key: string,
        descriptor: PropertyDescriptor
      ) {
        console.log("访问器装饰器 target   ->", target);
        console.log("key ->", key);
        console.log("descript ->", descriptor);
      }

      class Phone {
        private _color: string = "green";

        get getColor() {
          return this._color;
        }

        @addDecorator
        set setColor(color: string) {
          this._color = color;
        }
      }

      const newP = new Phone()
      newP.setColor = "yellow"
      console.log("访问器装饰器", newP);




      // 装饰器加载顺序
      function ClassDecorator1() {
        return function (target: any) {
          console.log("==> 第1个类装饰器");
        }
      }

      function ClassDecorator2() {
        return function (target: any) {
          console.log("==> 第2个类装饰器");
        }
      }

      function MethodDecorator0() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
          console.log(`==>${methodName} 第1个方法装饰器`);
        }
      }

      function MethodDecorator1() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
          console.log(`==>${methodName} 第2个方法装饰器`);
        }
      }

      function MethodDecorator2() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
          console.log(`==>${methodName} 方法装饰器`);
        }
      }

      function StaticMethodDecorator() {
        return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
          console.log(`==>${methodName} 静态方法装饰器`);
        }
      }

      function Param1Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
          console.log(`==>${methodName} 方法，第 ${paramIndex} 个参数装饰器`);
        }
      }

      function Param2Decorator() {
        return function (target: any, methodName: string, paramIndex: number) {
          console.log(`==>${methodName} 方法，第 ${paramIndex} 个参数装饰器`);
        }
      }

      function SayParamDecorator() {
        return function (target: any, methodName: string, paramIndex: number) {
          console.log(`==>${methodName} 方法，第 ${paramIndex} 个参数装饰器`);
        }
      }

      function PropertyDecorator0() {
        return function (target: any, propertyName: string) {
          console.log(`==>${propertyName} 第1个属性装饰器`);
        }
      }

      function StaticPropertyDecorator() {
        return function (target: any, propertyName: string) {
          console.log(`==>${propertyName} 静态属性装饰器`);
        }
      }

      function PropertyDecorator1() {
        return function (target: any, propertyName: string) {
          console.log(`==>${propertyName} 第2个属性装饰器`);
        }
      }

      function PropertyDecorator2() {
        return function (target: any, propertyName: string) {
          console.log(`==>${propertyName} 属性装饰器`);
        }
      }
      @ClassDecorator1()
      @ClassDecorator2()

      class HelloDD {
        @PropertyDecorator0()
        @PropertyDecorator1()
        greeting!: string; // !: 解决属性不设置默认值会报错

        @MethodDecorator0()
        @MethodDecorator1()
        greet(@Param1Decorator() p1: string, @Param2Decorator() p2: string) {}

        @StaticPropertyDecorator()
        static age: number = 12

        @StaticMethodDecorator()
        static eat() {}

        @PropertyDecorator2()
        name: string = "abc"

        @MethodDecorator2()
        say(@SayParamDecorator() p1: string, ) {}


      }
    }
  });
</script>
