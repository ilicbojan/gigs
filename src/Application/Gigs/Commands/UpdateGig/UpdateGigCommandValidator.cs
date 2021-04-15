﻿using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Gigs.Commands.UpdateGig
{
    public class UpdateGigCommandValidator : AbstractValidator<UpdateGigCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateGigCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(x => x.Date)
                .NotEmpty().WithMessage("Date is required")
                .Must(DateGreaterThanToday).WithMessage("Date must be greater than today");

            RuleFor(x => x.Time)
                .NotEmpty().WithMessage("Time is required");

            RuleFor(x => x.BandId)
                .NotEmpty().WithMessage("Band is required")
                .MustAsync(BandExists).WithMessage("Band does not exist");

            RuleFor(x => x.CafeId)
                .NotEmpty().WithMessage("Cafe is required")
                .MustAsync(CafeExists).WithMessage("Cafe does not exist");
        }

        public bool DateGreaterThanToday(UpdateGigCommand command, string date)
        {
            return DateTime.Parse(date) > DateTime.Today;
        }

        public async Task<bool> BandExists(UpdateGigCommand command, int id, CancellationToken cancellationToken)
        {
            return await _context.Bands.AnyAsync(x => x.Id == id);
        }

        public async Task<bool> CafeExists(UpdateGigCommand command, int id, CancellationToken cancellationToken)
        {
            return await _context.Cafes.AnyAsync(x => x.Id == id);
        }
    }
}
