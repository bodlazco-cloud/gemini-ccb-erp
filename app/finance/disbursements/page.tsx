export default function PaymentRelease() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Payment Release (Dual-Auth)</h1>
      
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 flex items-center gap-4">
        <ShieldAlert className="text-red-600" />
        <p className="text-sm text-red-800">
          <strong>Security Notice:</strong> Transactions over 50,000 PHP require BOD Digital Signature.
        </p>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Payee</th>
            <th>Reference (PO/NTP)</th>
            <th>Amount (PHP)</th>
            <th>Source Doc</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>A-1 Construction Subcon</td>
            <td>NTP-ALPHA-102</td>
            <td className="font-bold">125,000.00</td>
            <td><Button variant="link">View PDF</Button></td>
            <td><Badge>PENDING_RELEASE</Badge></td>
            <td>
              <Button className="bg-green-600">Authorize Release</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
