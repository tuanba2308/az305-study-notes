name: Auto Reorganize AZ-305 Notes

on:
  push:
    paths:
      - 'az305.md'

jobs:
  reorganize-az305:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run AI Agent on AZ-305 Notes
        uses: github/ai-agent-action@latest
        with:
          file: 'az305.md'
          prompt: |
            Organize this AZ-305 study file:
            - Group by sections: Identity & Security, Data, BCDR, Infra, Monitoring, References.
            - Move new items to the right section.
            - Alphabetize lists, clean duplicates, format markdown.
            - Add/update a table of contents at the top.
