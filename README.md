<p align="center">
  <img src="https://raw.githubusercontent.com/meilisearch/integration-guides/main/assets/logos/meilisearch_js.svg" alt="Meilisearch" width="200" height="200" />
</p>

<h1 align="center">Determinitic key creator for a Meilisearch instance</h1>

<h4 align="center">
  <a href="https://github.com/meilisearch/meilisearch">Meilisearch</a> |
  <a href="https://docs.meilisearch.com">Documentation</a> |
  <a href="https://slack.meilisearch.com">Slack</a> |
  <a href="https://www.meilisearch.com">Website</a> |
  <a href="https://docs.meilisearch.com/faq">FAQ</a>
</h4>

<p align="center">
  <a href="https://app.bors.tech/repositories/34942"><img src="https://bors.tech/images/badge_small.svg" alt="Bors enabled"></a>
  <a href="https://github.com/bidoubiwa/deterministic_key_creation/actions"><img src="https://github.com/bidoubiwa/deterministic_key_creation/workflows/Tests/badge.svg" alt="Tests"></a>
  <a href="https://github.com/bidoubiwa/deterministic_key_creation/blob/main/LICENCE"><img src="https://img.shields.io/badge/license-MIT-informational" alt="License"></a>
</p>
<br/>

<p align="center" style="font-weight:bold;" >A Manually triggered CI to create a deterministic api key on a given Meilisearch instance</p>

<br/>


Using the [manual workflow](https://github.com/bidoubiwa/deterministic_key_creation/actions/workflows/create-key.yml) create automatically a key on your Meilisearch instance with a specific key uid.

The purpose of this tool is to be able to quickly re-create a deterministic key everytime you update your Meilisearch or, when you create another instance that should have the same credentials as another.

## Usage

1. Go to the [workflow page](https://github.com/bidoubiwa/deterministic_key_creation/actions/workflows/create-key.yml)
2. Click on `Run Workflow`
3. Fill the form
4. Click on `Run workflow` at the bottom of the form

## Example

<img src="assets/form_example.png" alt="Workflow form" width=300/>

## 🤖 Compatibility with Meilisearch

This package only guarantees the compatibility with the [version v0.28.0 of Meilisearch](https://github.com/meilisearch/meilisearch/releases/tag/v0.28.0).



