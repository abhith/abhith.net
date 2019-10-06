import React, { Component } from "react";
import { FaFlag } from "react-icons/fa";

export default class Timeline extends Component {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="divider is-centered"></div>
          <h2 className="title is-semibold has-text-centered is-spaced">
            Career Path
          </h2>
          <h4 className="subtitle is-6 has-text-centered is-compact">
            An overview of my career timeline shown below.
          </h4>

          <div className="timeline is-centered mt-3">
            <header className="timeline-header">
              <span className="tag is-medium is-primary">Now</span>
            </header>
            <div className="timeline-item">
              <div className="timeline-marker is-icon">
                <FaFlag></FaFlag>
              </div>
              <div className="timeline-content">
                <p className="heading has-text-info has-text-weight-bold">
                  March 2019
                </p>
                <p>Emcredit, Dubai - Software Engineer</p>
              </div>
            </div>
            <header className="timeline-header">
              <span className="tag is-primary">2019</span>
            </header>
            <div className="timeline-item">
              <div className="timeline-marker is-icon">
                <FaFlag></FaFlag>
              </div>
              <div className="timeline-content">
                <p className="heading has-text-info	has-text-weight-bold">
                  September 2018
                </p>
                <p>Unibeton Ready Mix, Dubai - Sr.Software Engineer</p>
              </div>
            </div>
            <header className="timeline-header">
              <span className="tag is-primary">2018</span>
            </header>
            <header className="timeline-header">
              <span className="tag is-primary">2017</span>
            </header>
            <header className="timeline-header">
              <span className="tag is-primary">2016</span>
            </header>
            <div className="timeline-item">
              <div className="timeline-marker is-icon">
                <FaFlag></FaFlag>
              </div>
              <div className="timeline-content">
                <p className="heading has-text-info has-text-weight-bold">
                  November 2015
                </p>
                <p>Sysberries Technology, Abu Dhabi — Software Engineer</p>
              </div>
            </div>
            <header className="timeline-header">
              <span className="tag is-primary">2015</span>
            </header>
            <header className="timeline-header">
              <span className="tag is-primary">2014</span>
            </header>
            <header className="timeline-header">
              <span className="tag is-primary">2013</span>
            </header>
            <div className="timeline-item">
              <div className="timeline-marker is-icon">
                <FaFlag></FaFlag>
              </div>
              <div className="timeline-content">
                <p className="heading has-text-info has-text-weight-bold">
                  July 2012
                </p>
                <p>
                  Aabasoft Technologies Private Limited, India — Software
                  Engineer
                </p>
              </div>
            </div>
            <div className="timeline-header">
              <span className="tag is-medium is-primary">Start</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
