---
title: Project management - Organize issues using labels
author: Abhith Rajan
authorURL: http://twitter.com/abhithrajan
---

Here I am listing the labels which I used to manage my projects in Gitlab and GitHub.

<!--truncate-->

### Area

Indicating the area to which issues belong.

| Label              | Description       | Color |
| ------------------ | ----------------- | ----- |
| area: optimization | Fine tuning works |       |

### Priority

Used to prioritize the issues.

| Label            | Description                          | Color |
| ---------------- | ------------------------------------ | ----- |
| priority: high   | Requires immediate attention         |       |
| priority: medium | Requires attention soon              |       |
| priority: low    | Does not require immediate attention |       |

### Stage

Indicating the current stage of the issue.

| Label                      | Description                                                         | Color |
| -------------------------- | ------------------------------------------------------------------- | ----- |
| stage: investigating       | Someone is looking into this                                        |       |
| stage: wontfix             | Does not regard this as an issue or will not implement this feature |       |
| stage: backlog             | Prioritized to be picked up in current sprint                       |       |
| stage: proposal            | No work has been done of this issue                                 |       |
| stage: awaiting response   | Potential fix was proposed; awaiting response                       |       |
| stage: pending release     | Works associated with this issue is done but not deployed           |       |
| stage: ready for work      | The issue is reproducible and in scope                              |       |
| stage: needs information   | Not enough info to reproduce the issue                              |       |
| stage: needs review        | Work done but needs review                                          |       |
| stage: needs investigating | Someone needs to look at this                                       |       |
| stage: work in progress    | Someone is working on it                                            |

### Type

Used to categorize the issues.

| Label                 | Description                                    | Color   |
| --------------------- | ---------------------------------------------- | ------- |
| type: bug             |                                                | #E54447 |
| type: chore           | Work is required w/ no deliverable to end user |         |
| type: duplicate       | This issue already exists                      |         |
| type: feature         | New feature that does not currently exist      |         |
| type: question        |                                                |         |
| type: enhancement     | Requested enhancement of existing feature      |         |
| type: breaking change | Requires a new major release version           |         |
| type: user experience | Improvements needed for UX                     |         |

Colors will be updated later. Let me know your thoughts on this.

#### See also

- [cypress - Labels | GitHub](https://github.com/cypress-io/cypress/labels)
