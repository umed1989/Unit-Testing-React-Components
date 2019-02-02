import React from "react";
import { shallow } from "enzyme";
import App from "./App";

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should have `th` "Items"', () => {
    expect(wrapper.contains(<th>Items</th>)).toBe(true);
  });

  it("should have a `button` element", () => {
    expect(wrapper.containsMatchingElement(<button>Add item</button>)).toBe(
      true
    );
  });

  it("should have a `input` element", () => {
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });

  it("`button` should be disabled", () => {
    const button = wrapper.find("button").first();
    expect(button.props().disabled).toBe(true);
  });
});

describe("The user populates the input", () => {
  let wrapper;
  const item = "Dushanbe";

  beforeEach(() => {
    wrapper = shallow(<App />);
    const input = wrapper.find("input").first();
    input.simulate("change", {
      target: {
        value: item
      }
    });
  });

  it("should update the state property `item`", () => {
    expect(wrapper.state().item).toEqual(item);
  });

  it("should enable the `button`", () => {
    const button = wrapper.find("button").first();
    expect(button.props().disabled).toBe(false);
  });

  describe("and then clears the input", () => {
    beforeEach(() => {
      let input = wrapper.find("input").first();
      input.simulate("change", {
        target: {
          value: ""
        }
      });
    });

    it("should disable the `button`", () => {
      const button = wrapper.find("button").first();
      expect(button.props().disabled).toBe(true);
    });
  });

  describe("and then submits the form", () => {
    beforeEach(() => {
      const form = wrapper.find("form").first();
      form.simulate("submit", {
        preventDefault: () => {}
      });
    });

    it("should add the item to state", () => {
      expect(wrapper.state().items).toContain(item);
    });

    it("should render the item in the table", () => {
      expect(wrapper.containsMatchingElement(<td>{item}</td>)).toBe(true);
    });

    it("should clear the input field", () => {
      const input = wrapper.find("input").first();
      expect(input.props().value).toEqual("");
    });

    it("should disable `button`", () => {
      const button = wrapper.find("button").first();
      expect(button.props().disabled).toBe(true);
    });
  });
});
