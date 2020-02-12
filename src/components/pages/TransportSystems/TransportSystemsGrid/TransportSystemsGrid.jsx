import React, { PureComponent } from "react";

import TransportSystem from "./TransportSystem/TransportSystem";
import If from "../../../parts/Condition/Condition";

import styles from "../transportSystems.module.less";

class TransportSystemsGrid extends PureComponent {
  state = {
    visible: false
  }

  visibleHandler = () => {
    this.setState({ visible: true });
  }

  render() {
    let transportSystems = this.props.transportSystems;

    if (!Array.isArray(transportSystems))
      return null;

    return (
      <If visible={this.visibleHandler}>
        <div className={styles["main"]}>
          {
            transportSystems.map((el, i) =>
              <TransportSystem
                key={el._id}
                element={el}
                show={this.state.visible}
                delay={100 * i}
              />
            )
          }
        </div>
      </If>
    );
  }
}

export default TransportSystemsGrid;