<template>
  <a-layout class="h-full w-full p-5">
    <header class="bg-gray-100 h-16 shadow-md rounded-md">
      <a-row class="p-5">
        <h1 class="font-sans text-xl">Linked List</h1>
      </a-row>
    </header>
    <a-layout class="m-5">
      <a-row>
        <svg
          id="linkedList"/>
      </a-row>
      <a-row>
        <div class="bg-gray-100 shadow-md p-5">
          <a-row type="flex">
            <a-col :span="23">
              <h1 class="text-xl">Structure</h1>
            </a-col>
            <a-col :span="1">
              <a-button
                @click="() => this.isStructureVisible = this.isStructureVisible ? false : true"
                type="link"
                :icon="structureIcon"/>
            </a-col>

          </a-row>

          <div v-if="isStructureVisible">
            <pre>{{linkedList}}</pre>
          </div>
        </div>
      </a-row>
      <a-row class="mt-5 mb-5">
        <div class="bg-gray-100 shadow-md p-5">
          <h1 class="text-xl">Actions</h1>
          <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="Append Node">
              <a-row>
                <a-col :span="16">
                  <a-input v-model="data" placeholder="Enter a number"/>
                </a-col>
                <a-col :span="2"/>
                <a-col :span="6">
                  <a-button
                    class="w-full"
                    type="primary"
                    @click="appendNode(data, true)"
                  >
                    Submit
                  </a-button>
                </a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Tab 2" force-render>
              Content of Tab Pane 2
            </a-tab-pane>
            <a-tab-pane key="3" tab="Tab 3">
              Content of Tab Pane 3
            </a-tab-pane>
          </a-tabs>
        </div>
      </a-row>


    </a-layout>
  </a-layout>
</template>

<script>
  import * as d3 from "d3";

  class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

  // class LinkedList {
  //   constructor() {
  //
  //   }
  //
  //   append(data) {
  //     const node = new Node(data);
  //     if (!this.head) {
  //       this.head = node;
  //       this.tail = node;
  //       this.size++;
  //       return `Append : ${data}`;
  //     }
  //     this.tail.next = node;
  //     this.tail = node;
  //     this.size++;
  //     return `Append : ${data}`;
  //   }
  //
  //   prepend(data) {
  //     const node = new Node(data);
  //     if (this.head) {
  //       const pastHead = this.head;
  //       node.next = pastHead;
  //       this.head = node;
  //       this.size++;
  //
  //       return `Prepend : ${data}`;
  //     }
  //     this.head = node;
  //     this.tail = node;
  //     this.size++;
  //     return `Prepend : ${data}`
  //   }
  //
  //   searchByIndex(index) {
  //     if (index < 0 || index > this.size - 1 || this.size <= 0) {
  //       return -1;
  //     } else {
  //       let current = this.head;
  //       let i = 0;
  //       while (current !== null && i < index) {
  //         current = current.next;
  //         i++;
  //       }
  //       return current.data;
  //     }
  //   }
  //
  //   searchByValue(value) {
  //     let i = 0;
  //     let current = this.head;
  //     while (current !== null && i < this.size) {
  //       if (current.data == value) {
  //         return i;
  //       }
  //       current = current.next;
  //       i++;
  //     }
  //   }
  //
  //   deleteByIndex(index) {
  //     if (index < 0 || index > this.size - 1 || this.size <= 0) {
  //       return -1;
  //     }
  //     if (index === 0) {
  //       let current = this.head;
  //       this.head = this.head.next;
  //       this.size--;
  //       return `Changed head : ${current.data}`;
  //     }
  //
  //     let current = this.head;
  //     let previous = null;
  //     let i = 0;
  //     while (current !== null && i < index) {
  //       previous = current;
  //       current = current.next;
  //       i++;
  //     }
  //     if (current !== null) {
  //       previous.next = current.next;
  //       this.tail = previous.next.next;
  //       this.size--;
  //       return `Removed data : ${current.data}`
  //     }
  //   }
  //
  //   deleteByValue(value) {
  //     let i = 0;
  //     let current = this.head;
  //     let previous = null;
  //     while (current !== null && i < this.size) {
  //       if (current.data === value && i === 0) {
  //         this.head = this.head.next;
  //         this.size--;
  //         return `Delete by value : ${current.data}`;
  //       } else if (current.data === value && current !== null) {
  //         previous.next = current.next;
  //         this.tail = previous.next.next;
  //         this.size--;
  //         return `Deleted by value : ${current.data}`
  //       }
  //       previous = current;
  //       current = current.next;
  //       i++;
  //     }
  //   }
  //
  //   values() {
  //     let values = [];
  //     let current = this.head;
  //     while (current !== null) {
  //       values.push(current.data);
  //       current = current.next;
  //     }
  //     return values;
  //   }
  // }

  const BASE_LINKED_LIST_LENGTH = 3;
  const LINKED_LIST_NODES_ATTRIBS = {
    radius: 30,
    cx: 100,
    cy: 50,
    color: `#b19cd9`,
    stroke: `black`
  };
  const NODE_ID_SUFFIX = `-NODE`;
  const TEXT_ID_SUFFIX = `-TEXT`;

  export default {
    name: "root-linked-list",
    data() {
      return {
        isStructureVisible: null,
        svgContainerKey: null,
        nodes: null,
        links: null,
        text: null,
        simulation: null,
        linkedListSVG: null,
        linkedList: {
          head: null,
          tail: null,
          size: 0
        },
        data: null
      }
    },
    computed: {
      structureIcon() {
        return this.isStructureVisible ? 'down' : 'up';
      },
      linkedListNodesData() {
        let iterator = 1;
        let values = [];
        let current = this.linkedList.head;
        while (current !== null) {
          values.push({
            ...LINKED_LIST_NODES_ATTRIBS,
            label: current.data,
            cx: LINKED_LIST_NODES_ATTRIBS.cx * iterator,
            idNode: `${iterator}${NODE_ID_SUFFIX}`,
            idText: `${iterator}${TEXT_ID_SUFFIX}`
          });
          iterator++;
          current = current.next;
        }
        return values;
      },
    },
    methods: {
      buildNodes() {
        this.linkedListSVG
          .append('g')
          .attr("class", "nodes")
          .selectAll("circle")
          .data(this.linkedListNodesData)
          .enter()
          .append("circle")
          .attr("id", (d) => d.idNode)
          .attr("cx", (d) => d.cx)
          .attr("cy", (d) => d.cy)
          .attr("r", (d) => d.radius)
          .transition().duration(1000).styleTween('fill', () => d3.interpolateNumber(1, 0))
          .style("fill", (d) => d.color);
        this.nodes = d3.selectAll('g.nodes');
      },
      buildText() {
        this.linkedListSVG.append('g')
          .attr("class", "text")
          .selectAll("text")
          .data(this.linkedListNodesData)
          .enter().append("text")
          .attr("id", (d) => d.idText)
          .attr("x", (d) => d.cx - 10)
          .attr("y", (d) => d.cy + 5)
          .text((d) => d.label)
          .transition()
          .duration(1000)
          .attr("font-size", "16px")
          .attr("fill", "white");
        this.text = d3.selectAll('g.text');
      },
      buildLinks() {
        this.linkedListSVG.append("g")
          .attr("class", "links")
          .selectAll("line")
          .data(this.linkedListNodesData)
          .enter()
          .append("line")
          .attr("x1", (d) => d.cx + 100)
          .attr("x2", (d) => d.cx)
          .attr("y1", (d) => d.cy)
          .attr("y2", (d) => d.cy)
          .style("stroke", "black");
        this.links = d3.selectAll('g.links');
        this.linkedListSVG.selectAll('line').filter((d, i, list) => i === list.length - 1).attr('display', 'none');
      },
      updateLinkedListSVG() {
        // Links.
        this.links.data(this.linkedListNodesData).remove();
        this.buildLinks();
        // Nodes.
        this.nodes.data(this.linkedListNodesData).remove();
        this.buildNodes();
        // Text.
        this.text.data(this.linkedListNodesData).remove();
        this.buildText();
      },
      appendNode(data, isSVGUpdating) {
        const node = new Node(data);
        if (!this.linkedList.head) {
          this.linkedList.head = node;
          this.linkedList.tail = node;
          this.linkedList.size++;
          if (isSVGUpdating) {
            this.updateLinkedListSVG();
          }
          return `Append : ${data}`;
        }
        this.linkedList.tail.next = node;
        this.linkedList.tail = node;
        this.linkedList.size++;
        if (isSVGUpdating) {
          this.updateLinkedListSVG();
        }
        return `Append : ${data}`;
      },
      constructSVG() {
        const svg = d3.select('#linkedList').attr('width', 1000).attr('height', 120).attr('overflow-x', 'scroll');
        this.linkedListSVG = svg;
      },
      plotLinkedList() {
        this.buildLinks();
        this.buildNodes();
        this.buildText();
      },
      buildRandomLinkedList() {
        for (let x = 0; x < BASE_LINKED_LIST_LENGTH; x++) {
          const randomNumber = Math.floor(Math.random() * 50) + 1;
          this.appendNode(randomNumber, false);
        }
      }
    },
    mounted() {
      this.buildRandomLinkedList();
      this.constructSVG();
      this.plotLinkedList();
    }
  }
</script>

<style scoped>

</style>
