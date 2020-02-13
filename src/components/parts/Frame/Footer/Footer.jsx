import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faFax } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faTwitter, faVk, faInstagram } from "@fortawesome/free-brands-svg-icons";

import concatClasses from "../../../../modules/concatClasses";

import styles from "./footer.module.less";

function Footer(props) {
  return (
    <footer className={styles["footer"]}>
      <div className={concatClasses(styles["footer-container"], styles["col-container"])}>
        <Column
          header={<div className={styles["header-logo"]}>Scan<span className={styles["logo-suffix"]}>UP</span></div>}
          className={styles["contacts-col"]}>
          <div className={styles["contacts-group"]}>
            <Contacts icon={faPhone}>+38 (777) 750 7050</Contacts>
            <Contacts icon={faFax}>+1 650-253-0001</Contacts>
            <Contacts icon={faEnvelope}>scanup@support.com</Contacts>
          </div>
          <div className={styles["contacts-group"]}>
            <div className={styles["address"]}>
              ABC LLC, D/B/A ScanUP 901 Cherry Ave. San Bruno, CA 94066 USA
            </div>
          </div>
        </Column>

        <Column header="Quick links">
          <PageLink to="/">Home</PageLink>
          <PageLink to="/transport-systems">Transport systems</PageLink>
          {
            props.isAuthorized
              ? <PageLink to="/account">Personal account</PageLink>
              : <PageLink to="/login">Login</PageLink>
          }
        </Column>

        <Column header="Support">
          <PageLink to="/about">About</PageLink>
          <PageLink to="/policy">Policy</PageLink>
        </Column>

        <Column>
          <Media icon={faFacebookF}>Facebook</Media>
          <Media icon={faTwitter}>Twitter</Media>
          <Media icon={faVk}>Vk</Media>
          <Media icon={faInstagram}>Instagram</Media>
        </Column>
      </div>
      <Bottom />
    </footer>
  );
}

function mapStateToProps(state) {
  return {
    isAuthorized: state.auth.isAuthorized
  }
}

export default connect(mapStateToProps)(Footer);

function Column(props) {
  return (
    <div className={styles["col"]}>
      <div className={styles["col-header"]}>{props.header}</div>
      <div className={concatClasses(styles["col-body"], props.className ?? null)}>
        {props.children}
      </div>
    </div>
  );
}

function Bottom(props) {
  return (
    <div className={styles["bottom"]}>
      <div className={styles["bottom-container"]}>
        Copyright 2019 - {new Date().getFullYear()} © ScanUP
        </div>
    </div>
  );
}

function Contacts(props) {
  return (
    <div className={styles["contacts"]}>
      <FontAwesomeIcon className={styles["contacts-logo"]} icon={props.icon} />
      <div className={styles["contacts-context"]}>{props.children}</div>
    </div>
  );
}

function PageLink(props) {
  return (
    <Link to={props.to} className={styles["link"]}>
      <span>{props.children}</span>
    </Link>
  );
}

function Media(props) {
  return (
    <Link to={props.to ?? ""} className={styles["media"]}>
      <div className={styles["media-logo-wrapper"]}>
        <FontAwesomeIcon className={styles["media-logo"]} icon={props.icon} />
      </div>
      <span className={styles["media-name"]}>{props.children}</span>
    </Link>
  );
}