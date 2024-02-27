using System;

namespace Exceptions;

public class EmailAlreadyExistException : Exception
{
    public string Email { get; }

    public EmailAlreadyExistException(string email) : base($"Email address '{email} is already in use.'")
    {
        Email = email;
    }
}