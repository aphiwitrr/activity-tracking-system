<template>
  <v-container class="mx-auto d-flex ga-10">
    <div>
      Editable
      <span>
        <TreeSkillPlain v-model="exampleSkillTree" />
      </span>
    </div>
    <div>
      Read
      <span>
        <TreeSkillPlain :items="exampleSkillTree" readonly />
      </span>
    </div>
  </v-container>
  <div>
    Reactive Raw Logs <br />
    {{ exampleSkillTree.map((i) => i.children?.map((c) => c.name)) }}
  </div>
</template>

<script lang="ts" setup>
import TreeSkillPlain from '@/components/TreeSkillPlain.vue'
import type { SkillNode } from '@/types/SkillNode'
import { ref } from 'vue'

const exampleSkillTree = ref<SkillNode[]>([
  {
    id: 'softdev',
    name: 'Software Development Skills',
    children: [
      {
        id: 'softdev_meth',
        name: 'Software Development Methodologies',
        children: [
          {
            id: 'waterfall',
            name: 'Waterfall',
            description:
              'A linear and sequential approach where each phase must be completed before the next one begins.'
          },
          {
            id: 'scrum',
            name: 'Scrum',
            description:
              'An Agile methodology that uses iterative progress through sprints and emphasizes collaboration.'
          },
          {
            id: 'xp',
            name: 'Extreme Programming (XP)',
            description:
              'A methodology that emphasizes customer satisfaction and continuous feedback.'
          },
          {
            id: 'rad',
            name: 'Rapid Application Development (RAD)',
            description: 'Focuses on quick and iterative prototyping with user feedback.'
          },
          {
            id: 'lean',
            name: 'Lean Software Development',
            description: 'A methodology focused on optimizing efficiency and minimizing waste.'
          }
        ]
      },
      {
        id: 'agile_meth',
        name: 'Agile Methodologies',
        children: [
          {
            id: 'scrum',
            name: 'Scrum',
            description:
              'An iterative approach to software delivery that builds software incrementally from the start of the project.'
          },
          {
            id: 'kanban',
            name: 'Kanban',
            description:
              'A visual approach to managing tasks and workflows that emphasizes continuous delivery.'
          },
          {
            id: 'lean',
            name: 'Lean Software Development',
            description:
              'Focuses on delivering value to the customer efficiently by eliminating waste and improving flow.'
          },
          {
            id: 'xp',
            name: 'Extreme Programming (XP)',
            description:
              'A methodology that improves software quality and responsiveness to changing customer requirements.'
          }
        ]
      },
      {
        id: 'design_principles',
        name: 'Design Principles and Software Architecture',
        children: [
          {
            id: 'solid',
            name: 'SOLID Principles',
            description:
              'A set of design principles to make software designs more understandable, flexible, and maintainable.'
          },
          {
            id: 'mvc',
            name: 'Model-View-Controller (MVC)',
            description:
              'A design pattern that separates an application into three main components: Model, View, and Controller.'
          },
          {
            id: 'microservices',
            name: 'Microservices Architecture',
            description:
              'An architectural style that structures an application as a collection of loosely coupled services.'
          },
          {
            id: 'eventdriven',
            name: 'Event-Driven Architecture',
            description:
              'A software architecture paradigm promoting the production, detection, and reaction to events.'
          }
        ]
      },
      {
        id: 'oop',
        name: 'Object-Oriented Programming (OOP)',
        children: [
          {
            id: 'encapsulation',
            name: 'Encapsulation',
            description:
              'The bundling of data and methods that operate on the data within one unit, such as a class in Java.'
          },
          {
            id: 'inheritance',
            name: 'Inheritance',
            description:
              'A mechanism where one class can inherit attributes and methods from another class.'
          },
          {
            id: 'polymorphism',
            name: 'Polymorphism',
            description:
              'The ability of different objects to be accessed through the same interface, each providing its own implementation.'
          },
          {
            id: 'abstraction',
            name: 'Abstraction',
            description:
              'The process of hiding the complex reality while exposing only the necessary parts.'
          }
        ]
      },
      {
        id: 'programming_skills',
        name: 'Programming Skills',
        level: '3',
        children: [
          {
            id: 'javascript',
            name: 'JavaScript',
            icon: 'mdi-language-javascript',
            description:
              'A versatile language for web development, used for both client-side and server-side applications.'
          },
          {
            id: 'typescript',
            name: 'TypeScript',
            icon: 'mdi-language-typescript',
            description:
              'A strongly typed superset of JavaScript that compiles to plain JavaScript.',
            children: [
              {
                id: 'typing',
                name: 'type object',
                description: 'structure object'
              }
            ]
          },
          {
            id: 'python',
            name: 'Python',
            icon: 'mdi-language-python',
            description:
              'A powerful high-level programming language with an emphasis on readability and simplicity.'
          },
          {
            id: 'java',
            name: 'Java',
            icon: 'mdi-language-java',
            description:
              'A robust, object-oriented language widely used for building large-scale applications.'
          }
        ]
      },
      {
        id: 'tdd',
        name: 'Unit Testing and Test-Driven Development (TDD)',
        children: [
          {
            id: 'unit_testing',
            name: 'Unit Testing',
            description:
              'A type of software testing where individual units or components of a software are tested.'
          },
          {
            id: 'tdd_principles',
            name: 'TDD Principles',
            description:
              'A software development process where tests are written before the code itself.'
          },
          {
            id: 'bdd',
            name: 'Behavior-Driven Development (BDD)',
            description:
              'An extension of TDD that focuses on the behavioral specification of software.'
          },
          {
            id: 'mocking',
            name: 'Mocking and Stubbing',
            description:
              'Techniques used in unit testing to simulate the behavior of complex objects.'
          }
        ]
      }
    ]
  }
])
</script>
