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
          <a-row>
            <a-col :span="5">
              <a-select class="w-full" :default-value="$options.DROPDOWN_SELECT_VALUES[0].value"
                        @change="handleActionTypeSelection">
                <a-select-option
                  v-for="selectItem in $options.DROPDOWN_SELECT_VALUES"
                  :key="selectItem.value"
                  :value="selectItem.value"
                >
                  {{selectItem.label}}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col :span="11">
              <a-input type="number" v-model="data" placeholder="Enter a number"/>
            </a-col>
            <a-col :span="6" :offset="2">
              <a-button
                class="w-full"
                type="primary"
                @click="performActionType(data, true)"
              >
                Submit
              </a-button>
            </a-col>
          </a-row>
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

  const DS_VALUE_SELECT_APPEND = {label: 'Append', value: 'append'};
  const DS_VALUE_SELECT_PREPEND = {label: 'Prepend', value: 'prepend'};
  const DS_VALUE_SELECT_DELETE_BY_VALUE = {label: 'Delete by value', value: 'delete-by-value'};
  const DS_VALUE_SELECT_DELETE_BY_INDEX = {label: 'Delete by index', value: 'delete-by-index'};
  const DROPDOWN_SELECT_VALUES = [
    DS_VALUE_SELECT_APPEND,
    DS_VALUE_SELECT_PREPEND,
    DS_VALUE_SELECT_DELETE_BY_VALUE,
    DS_VALUE_SELECT_DELETE_BY_INDEX
  ];

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
        selectedDropdownValue: DROPDOWN_SELECT_VALUES[0].value,
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
      hasLinkedListNodes() {
        return this.linkedList.size >= 1 ? true : false;
      },
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
        this.links.data(this.linkedListNodesData).remove();
        this.buildLinks();
        this.nodes.data(this.linkedListNodesData).remove();
        this.buildNodes();
        this.text.data(this.linkedListNodesData).remove();
        this.buildText();
      },
      performActionType(data, isSVGUpdating) {
        switch (this.selectedDropdownValue) {
          case DS_VALUE_SELECT_APPEND.value:
            this.appendNode(data, isSVGUpdating);
            break;
          case DS_VALUE_SELECT_PREPEND.value:
            this.prependNode(data, isSVGUpdating);
            break;
          case DS_VALUE_SELECT_DELETE_BY_VALUE.value:
            this.deleteByValueNode(data, isSVGUpdating);
            break;
          case DS_VALUE_SELECT_DELETE_BY_INDEX.value:
            this.deleteByIndexNode(data, isSVGUpdating);
            break;
        }
      },
      deleteByIndexNode(index, isSVGUpdating) {
        if (index < 0 || index > this.linkedList.size - 1 || this.linkedList.size <= 0) {
          return -1;
        }
        if (index === 0) {
          let current = this.linkedList.head;
          this.linkedList.head = this.linkedList.head.next;
          this.linkedList.size--;
          if (isSVGUpdating) {
            this.updateLinkedListSVG();
          }
          return `Changed head : ${current.data}`;
        }

        let i = 0;
        let current = this.linkedList.head;
        let previous = null;
        while (current !== null) {
          if (i == index) {
            if (previous === null) {
              this.linkedList.head = current.next;
            } else if (i == this.linkedList.size - 1) {
              this.linkedList.tail = previous;
              this.linkedList.tail.next = null;
              previous.next = current.next;
            } else {
              previous.next = current.next;
            }
            this.linkedList.size--;
            if (this.linkedList.size == 0) this.linkedList.tail = null;
            if (isSVGUpdating) {
              this.updateLinkedListSVG();
            }
            return true;
          }
          previous = current;
          current = current.next;
          i++;
        }
      },
      deleteByValueNode(data, isSVGUpdating) {
        let i = 0;
        let current = this.linkedList.head;
        let previous = null;
        while (current !== null) {
          if (current.data == data) {
            if (previous === null) {
              this.linkedList.head = current.next;
            } else if (i == this.linkedList.size - 1) {
              this.linkedList.tail = previous;
              this.linkedList.tail.next = null;
              previous.next = current.next;
            } else {
              previous.next = current.next;
            }
            this.linkedList.size--;
            if (this.linkedList.size == 0) this.linkedList.tail = null;
            if (isSVGUpdating) {
              this.updateLinkedListSVG();
            }
            return true;
          }
          previous = current;
          current = current.next;
          i++;
        }
      },
      prependNode(data, isSVGUpdating) {
        const node = new Node(data);
        if (this.linkedList.head) {
          const pastHead = this.linkedList.head;
          node.next = pastHead;
          this.linkedList.head = node;
          this.linkedList.size++;
          if (isSVGUpdating) {
            this.updateLinkedListSVG();
          }
          return `Prepend : ${data}`;
        }
        this.linkedList.head = node;
        this.linkedList.tail = node;
        this.linkedList.size++;
        if (isSVGUpdating) {
          this.updateLinkedListSVG();
        }
        return `Prepend : ${data}`;
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
      },
      handleActionTypeSelection(value) {
        this.selectedDropdownValue = value;
      }
    },
    mounted() {
      this.buildRandomLinkedList();
      this.constructSVG();
      this.plotLinkedList();
    },
    DROPDOWN_SELECT_VALUES: DROPDOWN_SELECT_VALUES
  }
</script>

<style scoped>

</style>
