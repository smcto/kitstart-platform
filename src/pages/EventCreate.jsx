import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  Plus, X, Search, ChevronDown, ChevronUp, MapPin, Save, Eye, LogOut,
  Users, Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Link2, Type, Camera, Truck, Palette, FileText, Check, ChevronRight, ChevronLeft
} from "lucide-react";

/* ── Data ────────────────────────────────────── */

const STEPS = [
  { num: 1, label: "Client" },
  { num: 2, label: "Événement" },
  { num: 3, label: "Animation(s)" },
  { num: 4, label: "Créa" },
  { num: 5, label: "Logistique" },
  { num: 6, label: "Récap" },
];

const CLIENT_TYPES = ["Professionnel", "Particulier"];

const CLIENT_GROUPS = ["Agence événementielle", "Entreprise", "Collectivité", "Association", "Particulier"];

const MOCK_CLIENTS = [
  { id: 56880, name: "AGENCE 2M EVENT RENNES", created: "18/08/17", cp: "35769", ville: "SAINT GREGOIRE CEDEX", devis: 1, factures: 0, raisonSociale: "AGENCE 2M EVENT", adresse: "12 Rue de la Liberté", email: "contact@2mevent.fr", tel: "02 99 12 34 56" },
  { id: 1272, name: "AGENCE LIVE", created: "18/08/17", cp: "35000", ville: "RENNES", devis: 14, factures: 6, raisonSociale: "AGENCE LIVE SAS", adresse: "8 Place de Bretagne", email: "info@agence-live.fr", tel: "02 99 67 89 01" },
  { id: 78, name: "AGENCE FOLKLORE", created: "09/11/17", cp: "41100", ville: "AZE", devis: 1, factures: 0, raisonSociale: "AGENCE FOLKLORE", adresse: "La Grande Rue", email: "contact@folklore.fr", tel: "02 54 11 22 33" },
  { id: 382, name: "AGENCE ATIL", created: "20/11/17", cp: "29500", ville: "ERGUÉ-GABÉRIC", devis: 14, factures: 6, raisonSociale: "AGENCE ATIL SARL", adresse: "Zone Artisanale de Kerourvois", email: "contact@atil.fr", tel: "02 98 44 55 66" },
  { id: 57346, name: "Agence Paul et Malo", created: "29/12/17", cp: "35800", ville: "DINARD", devis: 1, factures: 2, raisonSociale: "PAUL ET MALO EVENTS", adresse: "3 Boulevard Wilson", email: "hello@pauletmalo.fr", tel: "02 99 88 77 66" },
  { id: 54979, name: "AGENCE MTC", created: "24/01/18", cp: "35760", ville: "SAINT-GRÉGOIRE", devis: 2, factures: 0, raisonSociale: "MTC ÉVÉNEMENTS", adresse: "Parc d'Activités La Bretèche", email: "contact@mtc-events.fr", tel: "02 99 23 45 67" },
  { id: 2345, name: "KONITYS EVENTS", created: "15/03/18", cp: "35000", ville: "RENNES", devis: 8, factures: 4, raisonSociale: "KONITYS SAS", adresse: "15 Quai Émile Zola", email: "events@konitys.com", tel: "02 99 34 56 78" },
  { id: 8901, name: "SELFIZEE BRETAGNE", created: "22/05/18", cp: "29200", ville: "BREST", devis: 6, factures: 3, raisonSociale: "SELFIZEE BRETAGNE SARL", adresse: "42 Rue Jean Jaurès", email: "bretagne@selfizee.com", tel: "02 98 12 34 56" },
  { id: 12034, name: "EVENTIME PARIS", created: "10/09/18", cp: "75008", ville: "PARIS", devis: 22, factures: 11, raisonSociale: "EVENTIME SAS", adresse: "120 Avenue des Champs-Élysées", email: "contact@eventime.fr", tel: "01 42 56 78 90" },
  { id: 15672, name: "MAGIC EVENTS", created: "03/01/19", cp: "44000", ville: "NANTES", devis: 5, factures: 2, raisonSociale: "MAGIC EVENTS SARL", adresse: "7 Rue Crébillon", email: "info@magic-events.fr", tel: "02 40 12 34 56" },
  { id: 19283, name: "PHOTOMATON PRO", created: "14/06/19", cp: "69003", ville: "LYON", devis: 9, factures: 5, raisonSociale: "PHOTOMATON PRO SAS", adresse: "28 Cours Lafayette", email: "pro@photomaton.fr", tel: "04 72 33 44 55" },
  { id: 22456, name: "FESTIV'ALL", created: "28/09/19", cp: "33000", ville: "BORDEAUX", devis: 3, factures: 1, raisonSociale: "FESTIV'ALL ÉVÉNEMENTS", adresse: "5 Place de la Bourse", email: "contact@festivall.fr", tel: "05 56 78 90 12" },
];

const EVENT_TYPES = ["Corporate", "Mariage", "Salon", "Festival", "Anniversaire", "Team Building", "Lancement produit", "Gala", "Soirée", "Inauguration", "Séminaire", "Congrès"];

const ANIMATION_TYPES = ["Selfizee", "Selfizee 360", "Selfizee Mirror", "Selfizee Mini", "Photobooth classique", "Borne tactile", "Mur digital", "Mosaïque photo", "Animation sur-mesure"];

const ANTENNES = [
  { id: "idf", name: "IDF Paris" },
  { id: "bretagne", name: "Bretagne" },
  { id: "rhone", name: "Rhône-Alpes" },
  { id: "paca", name: "PACA" },
  { id: "ouest", name: "Grand Ouest" },
  { id: "est", name: "Grand Est" },
  { id: "occitanie", name: "Occitanie" },
  { id: "nord", name: "Hauts-de-France" },
  { id: "international", name: "International" },
];

const PAYS = ["France", "Belgique", "Suisse", "Luxembourg", "Espagne", "Italie", "Allemagne", "Royaume-Uni", "Portugal", "Pays-Bas"];

const MOCK_OPPORTUNITIES = [
  { id: 1, name: "OPP-2026-001 — Salon du Mariage Paris" },
  { id: 2, name: "OPP-2026-002 — Gala Entreprise Lyon" },
  { id: 3, name: "OPP-2026-003 — Festival Nantes" },
  { id: 4, name: "OPP-2026-004 — Séminaire Bordeaux" },
  { id: 5, name: "OPP-2026-005 — Team Building Rennes" },
];

const MOCK_DEVIS = [
  { id: "D-2026-0142", borne: "Selfizee Pro 360", event: "Salon du Mariage Paris", contact: "Marie Dupont", date: "15/01/2026", ht: "2 450,00 €", ttc: "2 940,00 €", etat: "Accepté" },
  { id: "D-2026-0156", borne: "Selfizee Mirror XL", event: "Gala Entreprise", contact: "Pierre Martin", date: "22/01/2026", ht: "3 800,00 €", ttc: "4 560,00 €", etat: "En attente" },
  { id: "D-2026-0163", borne: "Selfizee 360 Spin", event: "Festival Nantes", contact: "Sophie Bernard", date: "28/01/2026", ht: "1 950,00 €", ttc: "2 340,00 €", etat: "Brouillon" },
];

const MOCK_CONTACTS = [
  { id: 1, nom: "Marie Dupont", fonction: "Directrice événementiel", email: "marie.dupont@client.fr", tel: "06 12 34 56 78" },
  { id: 2, nom: "Pierre Martin", fonction: "Chef de projet", email: "pierre.martin@client.fr", tel: "06 98 76 54 32" },
  { id: 3, nom: "Sophie Bernard", fonction: "Responsable communication", email: "sophie.bernard@client.fr", tel: "06 55 44 33 22" },
];

const BORNE_MODELS = [
  { id: "pro360", name: "Selfizee Pro 360", available: 312 },
  { id: "mirror", name: "Selfizee Mirror XL", available: 124 },
  { id: "ring", name: "Selfizee Ring Light", available: 89 },
  { id: "mini", name: "Selfizee Mini", available: 156 },
  { id: "360spin", name: "Selfizee 360 Spin", available: 42 },
];

const TRANSPORTEURS = ["Antenne locale (pas d'expédition)", "UPS Express", "UPS Standard", "TNT Express", "TNT Economy", "DHL Express", "Chronopost", "Transporteur dédié"];

/* ── Page ──────────────────────────────────────────── */

export default function EventCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientSearch, setClientSearch] = useState("");
  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [villeManuelle, setVilleManuelle] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [showContactPicker, setShowContactPicker] = useState(false);
  const clientSearchRef = useRef(null);

  const [form, setForm] = useState({
    // Step 1 - Client
    clientType: "Professionnel",
    clientGroup: "",
    raisonSociale: "",
    enseigne: "",
    adresse: "",
    adresseComp: "",
    codePostal: "",
    ville: "",
    pays: "France",
    telEntreprise: "",
    tel2: "",
    emailGeneral: "",
    commentaire: "",
    opportunite: "",
    // Step 2 - Événement
    eventName: "",
    eventType: "",
    animationType: "Selfizee",
    antennes: [],
    description: "",
    objectifs: "",
    // Step 3 - Animation(s)
    bornesSelection: [{ model: "pro360", qty: 1 }],
    options: { impressions: true, gif: false, video: false, galerieEnLigne: true },
    // Step 4 - Créa
    template: "",
    couleur1: "#4F46E5",
    couleur2: "#FFFFFF",
    texteAccueil: "",
    textePartage: "",
    logo: null,
    // Step 5 - Logistique
    antenneId: "",
    transporteur: "Antenne locale (pas d'expédition)",
    adresseLivraison: "",
    dateLivraison: "",
    dateStart: "",
    dateEnd: "",
    lieuEvent: "",
    adresseEvent: "",
    // Step 6 - Récap
    notes: "",
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));

  // Filter clients based on search
  const filteredClients = clientSearch.length >= 2
    ? MOCK_CLIENTS.filter(c =>
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.id.toString().includes(clientSearch) ||
        c.ville.toLowerCase().includes(clientSearch.toLowerCase())
      )
    : [];

  const selectClient = (client) => {
    setSelectedClient(client);
    setClientSearch(client.name);
    setClientDropdownOpen(false);
    setForm(f => ({
      ...f,
      raisonSociale: client.raisonSociale,
      adresse: client.adresse,
      codePostal: client.cp,
      ville: client.ville,
      emailGeneral: client.email,
      telEntreprise: client.tel,
    }));
  };

  const addContact = (contact) => {
    if (!contacts.find(c => c.id === contact.id)) {
      setContacts([...contacts, contact]);
    }
    setShowContactPicker(false);
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const goNext = () => setCurrentStep(s => Math.min(s + 1, 6));
  const goPrev = () => setCurrentStep(s => Math.max(s - 1, 1));

  // Close client dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (clientSearchRef.current && !clientSearchRef.current.contains(e.target)) {
        setClientDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <AppShell currentApp="Events Manager" activeKey="create">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-[20px] font-bold text-[--k-text]">Création événement</h1>
        <div className="flex items-center gap-2">
          <button className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm">
            Enregistrer
          </button>
          <button className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm">
            Enregistrer et afficher la fiche
          </button>
          <button className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm">
            Enregistrer et quitter
          </button>
          <button className="h-9 rounded-lg bg-[--k-text] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm">
            Quitter
          </button>
        </div>
      </div>

      {/* Step Navigation */}
      <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm mb-5 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          {STEPS.map(step => (
            <button
              key={step.num}
              onClick={() => setCurrentStep(step.num)}
              className={cn(
                "px-4 py-2 rounded-lg text-[13px] font-medium transition border",
                currentStep === step.num
                  ? "bg-[--k-text] text-white border-[--k-text]"
                  : "bg-white text-[--k-text] border-[--k-border] hover:bg-[--k-surface-2]"
              )}
            >
              {step.num} – {step.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="pb-10">
        {/* ─── Step 1: Client ─────────────────────── */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Client Info */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Client</h2>
              </div>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Type Client" required>
                    <select value={form.clientType} onChange={e => update("clientType", e.target.value)} className="input-field">
                      {CLIENT_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>

                  <Field label="Client" required>
                    <div ref={clientSearchRef} className="relative">
                      <div className="relative">
                        <input
                          value={clientSearch}
                          onChange={e => { setClientSearch(e.target.value); setClientDropdownOpen(true); }}
                          onFocus={() => clientSearch.length >= 2 && setClientDropdownOpen(true)}
                          placeholder="Rechercher"
                          className="input-field pr-8"
                        />
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[--k-muted]" />
                      </div>
                      {clientDropdownOpen && filteredClients.length > 0 && (
                        <div className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-lg border border-[--k-border] bg-white shadow-lg">
                          <div className="p-2 border-b border-[--k-border]">
                            <div className="flex items-center gap-2 px-2 py-1.5 bg-[--k-surface-2] rounded text-[12px] text-[--k-muted]">
                              <Search className="h-3.5 w-3.5" />
                              <input
                                value={clientSearch}
                                onChange={e => setClientSearch(e.target.value)}
                                className="bg-transparent border-none outline-none flex-1 text-[--k-text]"
                                autoFocus
                              />
                            </div>
                          </div>
                          {filteredClients.map((client, i) => (
                            <button
                              key={client.id}
                              onClick={() => selectClient(client)}
                              className={cn(
                                "w-full text-left px-3 py-2.5 text-[13px] hover:bg-[--k-primary] hover:text-white transition",
                                i === 0 && "bg-[--k-primary] text-white"
                              )}
                            >
                              {client.name} – #{client.id} – crée {client.created} – {client.cp} – {client.ville}
                              {client.devis > 0 && ` – ${client.devis} Devis`}
                              {client.factures > 0 && ` – ${client.factures} Facture(s)`}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </Field>

                  <Field label="Groupe de client">
                    <select value={form.clientGroup} onChange={e => update("clientGroup", e.target.value)} className="input-field">
                      <option value="">Séléctionner</option>
                      {CLIENT_GROUPS.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </Field>

                  <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                    <Field label="Raison sociale" required>
                      <input value={form.raisonSociale} onChange={e => update("raisonSociale", e.target.value)} className="input-field" />
                    </Field>
                    <Field label="Enseigne">
                      <input value={form.enseigne} onChange={e => update("enseigne", e.target.value)} className="input-field" />
                    </Field>
                  </div>

                  <Field label="Adresse" span={1}>
                    <input value={form.adresse} onChange={e => update("adresse", e.target.value)} placeholder="Indiquez un lieu" className="input-field" />
                  </Field>
                  <Field label="Adresse complémentaire">
                    <input value={form.adresseComp} onChange={e => update("adresseComp", e.target.value)} className="input-field" />
                  </Field>

                  <Field label="Code postal">
                    <input value={form.codePostal} onChange={e => update("codePostal", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Ville">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-[12px] text-[--k-muted] cursor-pointer whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={villeManuelle}
                          onChange={() => setVilleManuelle(!villeManuelle)}
                          className="rounded border-[--k-border]"
                        />
                        Saisir manuellement
                      </label>
                      {villeManuelle ? (
                        <input value={form.ville} onChange={e => update("ville", e.target.value)} className="input-field flex-1" />
                      ) : (
                        <select value={form.ville} onChange={e => update("ville", e.target.value)} className="input-field flex-1">
                          <option value="">Sélectionner par rapport au code postal</option>
                          {form.codePostal && form.ville && <option value={form.ville}>{form.ville}</option>}
                        </select>
                      )}
                    </div>
                  </Field>

                  <Field label="Pays">
                    <select value={form.pays} onChange={e => update("pays", e.target.value)} className="input-field">
                      {PAYS.map(p => <option key={p}>{p}</option>)}
                    </select>
                  </Field>
                  <Field label="Tél entreprise">
                    <input value={form.telEntreprise} onChange={e => update("telEntreprise", e.target.value)} className="input-field" />
                  </Field>

                  <Field label="2ème Téléphone">
                    <input value={form.tel2} onChange={e => update("tel2", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Email général">
                    <input type="email" value={form.emailGeneral} onChange={e => update("emailGeneral", e.target.value)} className="input-field" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Contacts associés */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                <div>
                  <h2 className="text-[14px] font-bold text-[--k-text]">Contact(s) associé(s) à l'événement :</h2>
                  <p className="text-[12px] text-[--k-muted] mt-0.5">Sélectionner le(s) contact(s) intervenant sur le projet</p>
                </div>
                <button
                  onClick={() => setShowContactPicker(!showContactPicker)}
                  className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5"
                >
                  Ajouter un contact
                </button>
              </div>
              <div className="p-5">
                {contacts.length === 0 ? (
                  <p className="text-[13px] text-[--k-muted]">Aucun contact</p>
                ) : (
                  <div className="space-y-2">
                    {contacts.map(c => (
                      <div key={c.id} className="flex items-center justify-between rounded-lg border border-[--k-border] px-3 py-2">
                        <div>
                          <span className="text-[13px] font-medium text-[--k-text]">{c.nom}</span>
                          <span className="text-[12px] text-[--k-muted] ml-2">{c.fonction}</span>
                          <span className="text-[12px] text-[--k-muted] ml-2">{c.email}</span>
                          <span className="text-[12px] text-[--k-muted] ml-2">{c.tel}</span>
                        </div>
                        <button onClick={() => removeContact(c.id)} className="text-[--k-muted] hover:text-[--k-danger]">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {showContactPicker && (
                  <div className="mt-3 rounded-lg border border-[--k-border] bg-[--k-surface-2] p-3">
                    <div className="text-[12px] font-semibold text-[--k-text] mb-2">Sélectionner un contact :</div>
                    <div className="space-y-1">
                      {MOCK_CONTACTS.filter(c => !contacts.find(x => x.id === c.id)).map(c => (
                        <button
                          key={c.id}
                          onClick={() => addContact(c)}
                          className="w-full text-left rounded-lg px-3 py-2 text-[13px] hover:bg-white transition"
                        >
                          <span className="font-medium">{c.nom}</span>
                          <span className="text-[--k-muted] ml-2">— {c.fonction}</span>
                          <span className="text-[--k-muted] ml-2">— {c.email}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Commentaire */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[14px] font-bold text-[--k-text]">Commentaire :</h2>
              </div>
              <div className="p-5">
                <RichTextEditor
                  value={form.commentaire}
                  onChange={val => update("commentaire", val)}
                  placeholder="Ajouter un commentaire..."
                />
              </div>
            </div>

            {/* Localisation Google Map */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[14px] font-bold text-[--k-text]">Localisation google map du client</h2>
              </div>
              <div className="p-5">
                <div className="w-full h-64 rounded-lg bg-blue-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-200/60 to-blue-300/40" />
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <MapPin className="h-8 w-8 text-red-500" />
                    <span className="text-[12px] text-[--k-muted]">
                      {form.adresse ? `${form.adresse}, ${form.codePostal} ${form.ville}` : "Localisation du client"}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[--k-muted] mt-1">Vous pouvez déplacer la position du curseur</p>
              </div>
            </div>

            {/* Opportunité */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Opportunité</h2>
              </div>
              <div className="p-5">
                <select value={form.opportunite} onChange={e => update("opportunite", e.target.value)} className="input-field">
                  <option value="">Séléctionner</option>
                  {MOCK_OPPORTUNITIES.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
              </div>
            </div>

            {/* Devis associés */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Devis associé(s)</h2>
                <p className="text-[12px] text-[--k-muted] mt-0.5">Sélectionner le(s) devis associé(s) à l'événement</p>
              </div>
              <div className="p-5">
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-[--k-border]">
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">N°</th>
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">Borne</th>
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">Event</th>
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">Contact</th>
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">Date devis</th>
                        <th className="text-right py-2 px-3 text-[12px] font-semibold text-[--k-muted]">HT</th>
                        <th className="text-right py-2 px-3 text-[12px] font-semibold text-[--k-muted]">TTC</th>
                        <th className="text-left py-2 px-3 text-[12px] font-semibold text-[--k-muted]">Etat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedClient ? MOCK_DEVIS.map(d => (
                        <tr key={d.id} className="border-b border-[--k-border] last:border-0 hover:bg-[--k-surface-2] transition">
                          <td className="py-2.5 px-3 font-medium">{d.id}</td>
                          <td className="py-2.5 px-3">{d.borne}</td>
                          <td className="py-2.5 px-3">{d.event}</td>
                          <td className="py-2.5 px-3">{d.contact}</td>
                          <td className="py-2.5 px-3">{d.date}</td>
                          <td className="py-2.5 px-3 text-right">{d.ht}</td>
                          <td className="py-2.5 px-3 text-right">{d.ttc}</td>
                          <td className="py-2.5 px-3">
                            <span className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                              d.etat === "Accepté" && "bg-green-100 text-green-700",
                              d.etat === "En attente" && "bg-amber-100 text-amber-700",
                              d.etat === "Brouillon" && "bg-gray-100 text-gray-600",
                            )}>{d.etat}</span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={8} className="py-6 text-center text-[13px] text-[--k-muted]">
                            Sélectionnez un client pour voir les devis associés
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-end">
              <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 2: Événement ────────────────────── */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Informations événement</h2>
              </div>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Nom de l'événement">
                    <input value={form.eventName} onChange={e => update("eventName", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Type d'événement" required>
                    <SelectWithClear
                      value={form.eventType}
                      onChange={val => update("eventType", val)}
                      options={EVENT_TYPES}
                      placeholder="Séléctionner"
                    />
                  </Field>
                  <Field label="Type d'animation" required>
                    <SelectWithClear
                      value={form.animationType}
                      onChange={val => update("animationType", val)}
                      options={ANIMATION_TYPES}
                      placeholder="Séléctionner"
                    />
                  </Field>
                  <Field label="Antenne(s)">
                    <input
                      value={form.antennes.map(id => ANTENNES.find(a => a.id === id)?.name).filter(Boolean).join(", ")}
                      readOnly
                      placeholder="Sélectionner une ou plusieurs antennes"
                      className="input-field cursor-pointer"
                      onClick={() => {/* could open a multi-select dropdown */}}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Description événement">
                      <RichTextEditor
                        value={form.description}
                        onChange={val => update("description", val)}
                        placeholder="Décrivez l'événement..."
                      />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Objectifs de l'événement / client">
                      <textarea
                        value={form.objectifs}
                        onChange={e => update("objectifs", e.target.value)}
                        rows={3}
                        className="input-field w-full resize-none"
                        placeholder="Quels sont les objectifs du client pour cet événement ?"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates événement */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Dates événement</h2>
              </div>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Date de début">
                    <input type="date" value={form.dateStart} onChange={e => update("dateStart", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Date de fin">
                    <input type="date" value={form.dateEnd} onChange={e => update("dateEnd", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Lieu de l'événement" span={2}>
                    <input value={form.lieuEvent} onChange={e => update("lieuEvent", e.target.value)} placeholder="Ex: Paris Expo — Porte de Versailles" className="input-field" />
                  </Field>
                  <Field label="Adresse de l'événement" span={2}>
                    <input value={form.adresseEvent} onChange={e => update("adresseEvent", e.target.value)} placeholder="1 Place de la Porte de Versailles, 75015 Paris" className="input-field" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 3: Animation(s) ────────────────── */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Affectation des bornes</h2>
              </div>
              <div className="p-5 space-y-3">
                {form.bornesSelection.map((row, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <select
                      value={row.model}
                      onChange={e => {
                        const newRows = [...form.bornesSelection];
                        newRows[i] = { ...newRows[i], model: e.target.value };
                        update("bornesSelection", newRows);
                      }}
                      className="input-field flex-1"
                    >
                      {BORNE_MODELS.map(m => (
                        <option key={m.id} value={m.id}>{m.name} ({m.available} dispo)</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      value={row.qty}
                      onChange={e => {
                        const newRows = [...form.bornesSelection];
                        newRows[i] = { ...newRows[i], qty: parseInt(e.target.value) || 1 };
                        update("bornesSelection", newRows);
                      }}
                      className="input-field w-20 text-center"
                    />
                    <span className="text-[11px] text-[--k-muted] w-10">unité{row.qty > 1 ? "s" : ""}</span>
                    {form.bornesSelection.length > 1 && (
                      <button
                        onClick={() => update("bornesSelection", form.bornesSelection.filter((_, j) => j !== i))}
                        className="text-[--k-muted] hover:text-[--k-danger]"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => update("bornesSelection", [...form.bornesSelection, { model: "pro360", qty: 1 }])}
                  className="flex items-center gap-1 text-[12px] font-medium text-[--k-primary] hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" /> Ajouter un modèle
                </button>
                <div className="mt-3 rounded-lg bg-blue-50/50 border border-blue-100 p-3 text-[12px]">
                  <div className="font-semibold text-blue-700 mb-1">Récapitulatif</div>
                  <div className="text-blue-600">
                    {form.bornesSelection.reduce((s, r) => s + r.qty, 0)} borne(s) demandée(s) — {form.bornesSelection.map(r => {
                      const m = BORNE_MODELS.find(b => b.id === r.model);
                      return `${r.qty}× ${m?.name}`;
                    }).join(", ")}
                  </div>
                </div>
              </div>
            </div>

            {/* Options & Prestations */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Options & Prestations</h2>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { key: "impressions", label: "Impressions" },
                    { key: "gif", label: "GIF animé" },
                    { key: "video", label: "Vidéo" },
                    { key: "galerieEnLigne", label: "Galerie en ligne" },
                  ].map(opt => (
                    <button
                      key={opt.key}
                      onClick={() => setForm(f => ({ ...f, options: { ...f.options, [opt.key]: !f.options[opt.key] } }))}
                      className={cn(
                        "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-medium transition",
                        form.options[opt.key]
                          ? "border-[--k-primary-border] bg-[--k-primary-2] text-[--k-primary]"
                          : "border-[--k-border] bg-white text-[--k-muted] hover:border-[--k-primary]/30"
                      )}
                    >
                      {opt.label}
                      {form.options[opt.key] && <Check className="h-3.5 w-3.5 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4: Créa ─────────────────────────── */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Personnalisation & Design</h2>
              </div>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Template">
                    <select value={form.template} onChange={e => update("template", e.target.value)} className="input-field">
                      <option value="">Choisir un template...</option>
                      {["Template Corporate Premium", "Template Mariage Premium", "Template Festival Fun", "Template Élégant Noir", "Template Coloré Pop", "Template Minimaliste", "Sur mesure (à briefer)"].map(t => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Logo client">
                    <label className="flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-dashed border-[--k-border] px-3 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition">
                      <Plus className="h-3.5 w-3.5" /> Uploader un logo
                      <input type="file" className="hidden" accept="image/*" />
                    </label>
                  </Field>
                  <Field label="Couleur primaire">
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.couleur1} onChange={e => update("couleur1", e.target.value)} className="h-9 w-9 rounded-lg border border-[--k-border] p-0.5 cursor-pointer" />
                      <input value={form.couleur1} onChange={e => update("couleur1", e.target.value)} className="input-field flex-1" />
                    </div>
                  </Field>
                  <Field label="Couleur secondaire">
                    <div className="flex items-center gap-2">
                      <input type="color" value={form.couleur2} onChange={e => update("couleur2", e.target.value)} className="h-9 w-9 rounded-lg border border-[--k-border] p-0.5 cursor-pointer" />
                      <input value={form.couleur2} onChange={e => update("couleur2", e.target.value)} className="input-field flex-1" />
                    </div>
                  </Field>
                  <Field label="Texte d'accueil" span={2}>
                    <input value={form.texteAccueil} onChange={e => update("texteAccueil", e.target.value)} placeholder="Bienvenue ! Prenez la pose !" className="input-field" />
                  </Field>
                  <Field label="Texte de partage" span={2}>
                    <input value={form.textePartage} onChange={e => update("textePartage", e.target.value)} placeholder="Retrouvez votre photo sur..." className="input-field" />
                  </Field>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 5: Logistique ──────────────────── */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Logistique & Expédition</h2>
              </div>
              <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Antenne de rattachement">
                    <select value={form.antenneId} onChange={e => update("antenneId", e.target.value)} className="input-field">
                      <option value="">Choisir une antenne...</option>
                      {ANTENNES.map(a => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Mode d'expédition">
                    <select value={form.transporteur} onChange={e => update("transporteur", e.target.value)} className="input-field">
                      {TRANSPORTEURS.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </Field>
                  {form.transporteur !== TRANSPORTEURS[0] && (
                    <>
                      <Field label="Adresse de livraison" span={2}>
                        <input value={form.adresseLivraison} onChange={e => update("adresseLivraison", e.target.value)} placeholder="Adresse complète de livraison" className="input-field" />
                      </Field>
                      <Field label="Date de livraison souhaitée">
                        <input type="date" value={form.dateLivraison} onChange={e => update("dateLivraison", e.target.value)} className="input-field" />
                      </Field>
                    </>
                  )}
                </div>
                {form.antenneId && (
                  <div className="mt-4 rounded-lg bg-amber-50/50 border border-amber-100 p-3 text-[12px]">
                    <div className="font-semibold text-amber-700 mb-1 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Antenne sélectionnée
                    </div>
                    <div className="text-amber-600">
                      {ANTENNES.find(x => x.id === form.antenneId)?.name}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 6: Récap ────────────────────────── */}
        {currentStep === 6 && (
          <div className="space-y-5">
            {/* Client recap */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Récapitulatif</h2>
              </div>
              <div className="p-5 space-y-4">
                <RecapSection title="Client">
                  <RecapRow label="Type client" value={form.clientType} />
                  <RecapRow label="Raison sociale" value={form.raisonSociale || "—"} />
                  <RecapRow label="Adresse" value={[form.adresse, form.codePostal, form.ville].filter(Boolean).join(", ") || "—"} />
                  <RecapRow label="Téléphone" value={form.telEntreprise || "—"} />
                  <RecapRow label="Email" value={form.emailGeneral || "—"} />
                </RecapSection>

                <RecapSection title="Événement">
                  <RecapRow label="Nom" value={form.eventName || "—"} />
                  <RecapRow label="Type" value={form.eventType || "—"} />
                  <RecapRow label="Animation" value={form.animationType || "—"} />
                  <RecapRow label="Dates" value={form.dateStart && form.dateEnd ? `${form.dateStart} → ${form.dateEnd}` : "—"} />
                  <RecapRow label="Lieu" value={form.lieuEvent || "—"} />
                  <RecapRow label="Objectifs" value={form.objectifs || "—"} />
                </RecapSection>

                <RecapSection title="Animation(s)">
                  <RecapRow
                    label="Bornes"
                    value={form.bornesSelection.map(r => {
                      const m = BORNE_MODELS.find(b => b.id === r.model);
                      return `${r.qty}× ${m?.name}`;
                    }).join(", ") || "—"}
                  />
                  <RecapRow label="Options" value={Object.entries(form.options).filter(([, v]) => v).map(([k]) => k).join(", ") || "—"} />
                </RecapSection>

                <RecapSection title="Créa">
                  <RecapRow label="Template" value={form.template || "—"} />
                  <RecapRow label="Couleurs" value={`${form.couleur1} / ${form.couleur2}`} />
                  <RecapRow label="Texte d'accueil" value={form.texteAccueil || "—"} />
                </RecapSection>

                <RecapSection title="Logistique">
                  <RecapRow label="Antenne" value={ANTENNES.find(a => a.id === form.antenneId)?.name || "—"} />
                  <RecapRow label="Transport" value={form.transporteur} />
                  {form.transporteur !== TRANSPORTEURS[0] && (
                    <>
                      <RecapRow label="Adresse livraison" value={form.adresseLivraison || "—"} />
                      <RecapRow label="Date livraison" value={form.dateLivraison || "—"} />
                    </>
                  )}
                </RecapSection>

                {contacts.length > 0 && (
                  <RecapSection title="Contacts">
                    {contacts.map(c => (
                      <RecapRow key={c.id} label={c.nom} value={`${c.fonction} — ${c.email} — ${c.tel}`} />
                    ))}
                  </RecapSection>
                )}
              </div>
            </div>

            {/* Notes internes */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Notes internes</h2>
              </div>
              <div className="p-5">
                <textarea
                  value={form.notes}
                  onChange={e => update("notes", e.target.value)}
                  rows={4}
                  placeholder="Notes internes, instructions particulières, accès, horaires montage..."
                  className="input-field w-full resize-none"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
              <button className="h-10 rounded-lg bg-[--k-success] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
                <Check className="h-4 w-4" /> Créer l'événement
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

/* ── Components ──────────────────────────────────── */

function Field({ label, children, required, span = 1 }) {
  return (
    <div className={cn(span === 2 && "sm:col-span-2")}>
      <label className="block text-[12px] font-semibold text-[--k-muted] mb-1.5">
        {label}
        {required && <span className="text-[--k-danger] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function SelectWithClear({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field pr-16"
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {value && (
        <button
          onClick={(e) => { e.preventDefault(); onChange(""); }}
          className="absolute right-7 top-1/2 -translate-y-1/2 text-[--k-muted] hover:text-[--k-danger] transition"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}

function RichTextEditor({ value, onChange, placeholder }) {
  return (
    <div className="rounded-lg border border-[--k-border] overflow-hidden">
      <div className="flex items-center gap-0.5 border-b border-[--k-border] bg-[--k-surface-2]/50 px-2 py-1.5">
        <ToolbarBtn title="Gras"><Bold className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn title="Italique"><Italic className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn title="Souligné"><Underline className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn title="Barré"><Strikethrough className="h-3.5 w-3.5" /></ToolbarBtn>
        <div className="w-px h-5 bg-[--k-border] mx-1" />
        <ToolbarBtn title="Liste à puces"><List className="h-3.5 w-3.5" /><ChevronDown className="h-2.5 w-2.5 -ml-0.5" /></ToolbarBtn>
        <ToolbarBtn title="Liste numérotée"><ListOrdered className="h-3.5 w-3.5" /><ChevronDown className="h-2.5 w-2.5 -ml-0.5" /></ToolbarBtn>
        <div className="w-px h-5 bg-[--k-border] mx-1" />
        <ToolbarBtn title="Lien"><Link2 className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn title="Effacer le formatage"><Type className="h-3.5 w-3.5" /></ToolbarBtn>
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={4}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-[13px] text-[--k-text] outline-none resize-none placeholder:text-[--k-muted]/50"
      />
    </div>
  );
}

function ToolbarBtn({ children, title }) {
  return (
    <button
      title={title}
      className="flex items-center gap-0.5 rounded px-1.5 py-1 text-[--k-muted] hover:bg-[--k-surface-2] hover:text-[--k-text] transition"
    >
      {children}
    </button>
  );
}

function RecapSection({ title, children }) {
  return (
    <div className="border-b border-[--k-border] pb-3 last:border-0 last:pb-0">
      <h3 className="text-[13px] font-bold text-[--k-text] mb-2">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function RecapRow({ label, value }) {
  return (
    <div className="flex gap-3 text-[13px]">
      <span className="text-[--k-muted] w-36 shrink-0">{label}</span>
      <span className="text-[--k-text]">{value}</span>
    </div>
  );
}
