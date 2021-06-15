<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    /**
     * 映射类型
     */
    // interface info {
    //   age: number
    // }
    // // 定义了一个ReadonlyType<T>映射类型
    // type ReadonlyType<T> = { readonly [P in keyof T]: T[P] }
    // type ReadonlyInfo = ReadonlyType<info>
    // let info: ReadonlyInfo = {
    //   age: 18
    // }
    // console.log(info);

    /**
     * 定义类型别名，
     */

    // 1、使用 type 关键字
    // type TypeString = string;
    // let str: TypeString;
    // // str = 123; // error Type '123' is not assignable to  type 'string'

    // // 2、类型别名也可以使用泛型
    // type PositionType<T> = { x: T; y: T };
    // const position1: PositionType<number> = {
    //   x: 1,
    //   y: -1
    // };
    // const position2: PositionType<string> = {
    //   x: "right",
    //   y: "top"
    // };

    /**
     * 泛型
     */
    // const getArray = <T>(value: T, times: number = 5): T[] => {
    //   return new Array(times).fill(value);
    // };

    // getArray<number[]>([1, 2], 3).forEach(item => {
    //   console.log(item, 2);
    // });
    // getArray<number>(2, 3).forEach(item => {
    //   console.log(item, 88);
    // });

    // 指定多个泛型
    const getArray = <T, U>(param1: T, param2: U, times: number): [T, U][] => {
      return new Array(times).fill([param1, param2]);
    };
    getArray(1, "a", 3).forEach(item => {
      console.log(item);
      // console.log(item[0].length); // error 类型“number”上不存在属性“length”
      // console.log(item[1].toFixed(2)); // error 属性“toFixed”在类型“string”上不存在
    });


    /**
     * 装饰器
     * 多个装饰器，会先执行装饰器工厂函数获取所有装饰器，然后再从后往前执行装饰器的逻辑
     */

    function setName() {
      console.log('get setName')
      return function(target) {
        console.log('setName')
      }
    }
    function setAge() {
      console.log('get setAge')
      return function(target) {
        console.log('setAge')
      }
    }
    @setName()
    @setAge()
    class Test { }
    // 打印出来的内容如下：
    /*
     'get setName'
     'get setAge'
     'setAge'
     'setName'
    */

    // 类装饰器
    function classDecorator<T extends { new(...args: any[]): {} }>(target: T) {
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
    console.log(new Greeter("world"));
    // {
    //     hello: "override"
    //     newProperty: "new property"
    //     property: "property"
    // }

    // 属性装饰器
    // function printPropertyName(target: any, propertyName: string) {
    //   console.log(propertyName);
    // }
    // class Info {
    //   @printPropertyName
    //   name: string;
    //   @printPropertyName
    //   age: number;
    // }

    // 参数装饰器
    function required(target: any, propertName: string, index: number) {
      console.log(`修饰的是${propertName}的第${index + 1}个参数`);
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

  }
})
</script>

