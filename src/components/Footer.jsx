import { clientInfo, providerInfo } from '../data/tasks';

export default function Footer() {
  return (
    <footer className="px-4 pt-6 md:px-6 mt-4 border-t border-border bg-white safe-bottom">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
        {/* Client Info */}
        <div>
          <h3 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
            Client
          </h3>
          <p className="text-[15px] text-dark font-medium">{clientInfo.client}</p>
        </div>

        {/* Provider Info */}
        <div>
          <h3 className="text-[13px] font-semibold text-secondary uppercase tracking-wide mb-2">
            Provider
          </h3>
          <p className="text-[15px] text-dark font-medium">{providerInfo.contact}</p>
          <p className="text-[13px] text-secondary">
            {providerInfo.rate}, {providerInfo.increments}
          </p>
          <p className="text-[13px] text-secondary">
            Contract signed: {providerInfo.contractSigned}
          </p>
          <p className="text-[13px] text-secondary mt-2">
            <a href="tel:610-301-9351" className="hover:text-dark">610-301-9351</a>
            {' · '}
            <a href="https://wa.me/16103019351" className="hover:text-dark">WhatsApp</a>
          </p>
          <p className="text-[13px] text-secondary">
            <a href="mailto:dan@keystonewebsolutions.com" className="hover:text-dark">dan@keystonewebsolutions.com</a>
          </p>
        </div>
      </div>

    </footer>
  );
}
