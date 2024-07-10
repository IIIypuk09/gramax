use git2::*;
use serde::Deserialize;

pub trait Creds {
  fn signature(&self) -> Result<Signature, Error>;
  fn access_token(&self) -> &str;
}

pub trait ActualCreds: Creds {}

pub struct DummyCreds;

impl Creds for DummyCreds {
  fn signature(&self) -> Result<Signature, Error> {
    Signature::now("Test", "test@email.org")
  }

  fn access_token(&self) -> &str {
    ""
  }
}

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
pub struct AccessTokenCreds {
  author_name: Box<str>,
  author_email: Box<str>,
  access_token: Box<str>,
}

impl AccessTokenCreds {
  pub fn new(author_name: &str, author_email: &str, access_token: &str) -> Self {
    Self {
      author_name: author_name.into(),
      author_email: author_email.into(),
      access_token: access_token.into(),
    }
  }
}

impl Creds for AccessTokenCreds {
  fn signature(&self) -> Result<Signature, Error> {
    Signature::now(&self.author_name, &self.author_email)
  }

  fn access_token(&self) -> &str {
    &self.access_token
  }
}

impl ActualCreds for AccessTokenCreds {}
