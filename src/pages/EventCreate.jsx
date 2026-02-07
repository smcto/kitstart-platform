import React, { useState, useRef, useEffect } from "react";
import { AppShell } from "../components/AppShell";
import { cn } from "../components/ui/cn";
import {
  Plus, X, Search, ChevronDown, MapPin,
  Bold, Italic, Underline, Strikethrough, List, ListOrdered,
  Link2, Type, Check, ChevronRight, ChevronLeft,
  Camera, Monitor, LayoutGrid, Gamepad2, Share2, Sparkles
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

const EVENT_TYPES_PRO = ["Corporate", "Salon", "Festival", "Gala", "Soirée", "Inauguration", "Séminaire", "Congrès", "Team Building"];
const EVENT_TYPES_PARTICULIER = ["Mariage", "Anniversaire", "Bar-Mitzvah", "Événement privé", "Soirée privée"];

const ANIMATION_TYPES = ["Selfizee", "Selfizee 360", "Selfizee Mirror", "Selfizee Mini", "Photobooth classique", "Borne tactile", "Mur digital", "Mosaïque photo", "Animation sur-mesure"];

const MOCK_RESPONSABLES = [
  { id: 1, prenom: "Thomas", nom: "Lefebvre", ville: "Paris", color: "bg-indigo-500" },
  { id: 2, prenom: "Julie", nom: "Martin", ville: "Rennes", color: "bg-pink-500" },
  { id: 3, prenom: "Maxime", nom: "Dubois", ville: "Lyon", color: "bg-emerald-500" },
  { id: 4, prenom: "Camille", nom: "Moreau", ville: "Nantes", color: "bg-amber-500" },
  { id: 5, prenom: "Alexandre", nom: "Petit", ville: "Bordeaux", color: "bg-cyan-500" },
  { id: 6, prenom: "Léa", nom: "Roux", ville: "Marseille", color: "bg-violet-500" },
  { id: 7, prenom: "Nicolas", nom: "Lambert", ville: "Strasbourg", color: "bg-rose-500" },
  { id: 8, prenom: "Emma", nom: "Garcia", ville: "Toulouse", color: "bg-teal-500" },
];

const OBJECTIFS_EVENT = [
  "Collecte data", "Animation", "Marque employeur", "Communication",
  "Engagement réseaux sociaux", "Remerciement clients",
];

const INTERNAL_TAGS = [
  "Client important", "Récurrent", "Première commande",
  "Urgent", "Partenaire", "À surveiller",
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
  { id: "D-2026-0142", borne: "Selfizee Pro 360", event: "Salon du Mariage Paris", eventType: "Salon", animationType: "Selfizee", dateEvent: "2026-03-15", contact: "Marie Dupont", date: "15/01/2026", ht: "2 450,00 €", ttc: "2 940,00 €", etat: "Accepté" },
  { id: "D-2026-0156", borne: "Selfizee Mirror XL", event: "Gala Entreprise", eventType: "Gala", animationType: "Selfizee Mirror", dateEvent: "2026-04-22", contact: "Pierre Martin", date: "22/01/2026", ht: "3 800,00 €", ttc: "4 560,00 €", etat: "Accepté" },
  { id: "D-2026-0163", borne: "Selfizee 360 Spin", event: "Festival Nantes", eventType: "Festival", animationType: "Selfizee 360", dateEvent: "2026-06-10", contact: "Sophie Bernard", date: "28/01/2026", ht: "1 950,00 €", ttc: "2 340,00 €", etat: "En attente" },
  { id: "D-2026-0178", borne: "Selfizee Mini", event: "Team Building Rennes", eventType: "Team Building", animationType: "Selfizee Mini", dateEvent: "2026-05-05", contact: "Marie Dupont", date: "03/02/2026", ht: "1 200,00 €", ttc: "1 440,00 €", etat: "Brouillon" },
];

const SKIP_DEVIS_REASONS = [
  "Partenariat",
  "Ami / famille",
  "Événement interne",
  "Démonstration / showroom",
  "Prestation offerte",
  "Échange de services",
  "Autre",
];

const MOCK_CONTACTS = [
  { id: 1, nom: "Marie Dupont", fonction: "Directrice événementiel", email: "marie.dupont@client.fr", tel: "06 12 34 56 78" },
  { id: 2, nom: "Pierre Martin", fonction: "Chef de projet", email: "pierre.martin@client.fr", tel: "06 98 76 54 32" },
  { id: 3, nom: "Sophie Bernard", fonction: "Responsable communication", email: "sophie.bernard@client.fr", tel: "06 55 44 33 22" },
];

const MODALITES_FACTURATION = [
  { id: "email", label: "Envoi par email" },
  { id: "chorus", label: "Chorus Pro (collectivité / établissement public)" },
  { id: "courrier", label: "Envoi par courrier" },
  { id: "plateforme", label: "Plateforme client (Coupa, Ariba, Ivalua...)" },
  { id: "portail", label: "Portail fournisseur dédié" },
  { id: "autre", label: "Autre" },
];

const BORNE_TYPES = ["Classik", "Spherik", "Prestige"];

const ANIMATION_CATALOG = [
  {
    id: "photobooth",
    label: "Animation Photobooth",
    icon: Camera,
    sections: [
      {
        key: "type",
        label: "Type d'animation",
        options: ["Photo", "Vidéo", "GIF", "Boomerang", "Snapchat"],
      },
      {
        key: "perso",
        label: "Options de personnalisation",
        options: ["Impression d'un photocall", "Magnets personnalisés", "Option fond vert"],
      },
      {
        key: "partage",
        label: "Partage & diffusion",
        options: ["Envoi de mail", "Galerie en ligne", "Mur de photos", "Prise de data"],
      },
    ],
  },
  {
    id: "diaporama",
    label: "Diaporama",
    icon: Monitor,
    sections: [
      {
        key: "format",
        label: "Format",
        options: ["Diaporama photo", "Diaporama vidéo", "Diaporama mixte"],
      },
      {
        key: "diffusion",
        label: "Diffusion",
        options: ["Affichage sur écran", "Projection murale"],
      },
    ],
  },
  {
    id: "mosaique",
    label: "Mosaïque photo",
    icon: LayoutGrid,
    sections: [
      {
        key: "type",
        label: "Type de mosaïque",
        options: ["Mosaïque en temps réel", "Mosaïque imprimée", "Mosaïque digitale"],
      },
      {
        key: "affichage",
        label: "Affichage",
        options: ["Affichage sur écran géant", "Projection murale"],
      },
    ],
  },
  {
    id: "jeux",
    label: "Animation Jeux",
    icon: Gamepad2,
    sections: [
      {
        key: "type",
        label: "Type de jeu",
        options: ["Quiz interactif", "Roue de la fortune", "Jeu de grattage digital", "Tirage au sort", "Challenge photo"],
      },
    ],
  },
  {
    id: "social",
    label: "Social Wall",
    icon: Share2,
    sections: [
      {
        key: "type",
        label: "Réseaux & fonctionnalités",
        options: ["Mur Instagram", "Mur Twitter / X", "Hashtag wall", "QR code partage"],
      },
    ],
  },
  {
    id: "autre",
    label: "Autre animation",
    icon: Sparkles,
    sections: [],
    customName: true,
  },
];

const TYPES_INSTALLATION = ["Envoi transporteur", "Pick-up", "Livraison & installation", "Livraison seulement", "Installation seulement"];

const TYPES_RETOUR = ["Retour Pick-up", "Retour transporteur", "Désinstallation & retour", "Désinstallation seulement", "Retour seulement"];

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
  const [showNewContactForm, setShowNewContactForm] = useState(false);
  const [newContact, setNewContact] = useState({ nom: "", prenom: "", fonction: "", email: "", tel: "" });
  const [selectedDevis, setSelectedDevis] = useState([]);
  const [skipDevis, setSkipDevis] = useState(false);
  const [skipDevisReason, setSkipDevisReason] = useState("");
  const [skipDevisCustomReason, setSkipDevisCustomReason] = useState("");
  const [responsableSearch, setResponsableSearch] = useState("");
  const [showResponsablePicker, setShowResponsablePicker] = useState(false);
  const [selectedResponsables, setSelectedResponsables] = useState([]);
  const [internalTags, setInternalTags] = useState([]);
  const [contactFacturation, setContactFacturation] = useState(null);
  const [showFacturationContactPicker, setShowFacturationContactPicker] = useState(false);
  const [contactsCrea, setContactsCrea] = useState([]);
  const [showCreaContactPicker, setShowCreaContactPicker] = useState(false);
  const [contactsSurPlace, setContactsSurPlace] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
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
    // Step 1 - Facturation
    modaliteFacturation: "",
    refFacturation: "",
    infoFacturation: "",
    commentaireFacturation: "",
    opportunite: "",
    // Step 2 - Événement
    eventName: "",
    eventType: "",
    animationType: "Selfizee",
    responsables: [],
    description: "",
    objectifs: [],
    // Step 2 - Dates événement
    periode: "jour", // "jour" or "periode"
    dateAnimation: "",
    dateAnimationFin: "",
    horaireEvent: "",
    debutImmobilisation: "",
    finImmobilisation: "",
    commentaireDates: "",
    // Step 2 - Lieu d'événement
    lieuNomAdresse: "",
    lieuSociete: "",
    lieuAdresse: "",
    lieuAdresse2: "",
    lieuCP: "",
    lieuVille: "",
    lieuPays: "",
    infoPratiques: "",
    modalitesAcces: "",
    // Step 2 - Documents & Suivi
    commentaireSurPlace: "",
    responsableProjet: "",
    // Step 3 - Animation(s)
    dispositifs: [{ id: 1, type: "Classik", qty: 1 }],
    animations: [{ catalogId: "photobooth", selectedOptions: [], comments: {}, customName: "" }],
    // Step 4 - Créa / Supports graphiques
    creaRealisee: "nous", // "nous" or "client"
    supportsACreer: "non", // "non" or "oui"
    supportsAImprimer: "non", // "non" or "oui"
    infosComplementairesCrea: "",
    commentaireCrea: "",
    // Step 5 - Logistique aller
    typeInstallation: "",
    commentaireAllerInterne: "",
    noteAllerClient: "",
    // Step 5 - Logistique retour
    typeRetour: "",
    jourRetour: "",
    heureRetourMode: "precise", // "precise" or "tranche"
    heureRetour: "",
    heureRetourDebut: "",
    heureRetourFin: "",
    commentaireRetourInterne: "",
    noteRetourClient: "",
    // Legacy logistique fields
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

  // Contacts sur place (Step 2)
  const addContactSurPlace = () => {
    setContactsSurPlace([...contactsSurPlace, {
      id: Date.now(), prenom: "", nom: "", fonction: "", email: "", telPortable: "", telFixe: "", type: "",
    }]);
  };

  const updateContactSurPlace = (id, key, val) => {
    setContactsSurPlace(contactsSurPlace.map(c => c.id === id ? { ...c, [key]: val } : c));
  };

  const removeContactSurPlace = (id) => {
    setContactsSurPlace(contactsSurPlace.filter(c => c.id !== id));
  };

  // Tags
  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tag) => {
    setTags(tags.filter(t => t !== tag));
  };

  const goNext = () => {
    // Pre-fill Step 2 from selected devis when leaving Step 1
    if (currentStep === 1 && selectedDevis.length > 0) {
      const firstDevis = MOCK_DEVIS.find(d => d.id === selectedDevis[0]);
      if (firstDevis) {
        setForm(f => ({
          ...f,
          eventName: f.eventName || firstDevis.event,
          eventType: f.eventType || firstDevis.eventType,
          animationType: f.animationType === "Selfizee" ? (firstDevis.animationType || f.animationType) : f.animationType,
          dateAnimation: f.dateAnimation || firstDevis.dateEvent,
        }));
      }
    }
    setCurrentStep(s => Math.min(s + 1, 6));
  };
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
      <div className="pb-20">
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

                  {form.clientType !== "Particulier" && (
                    <Field label="Groupe de client">
                      <select value={form.clientGroup} onChange={e => update("clientGroup", e.target.value)} className="input-field">
                        <option value="">Séléctionner</option>
                        {CLIENT_GROUPS.map(g => <option key={g}>{g}</option>)}
                      </select>
                    </Field>
                  )}

                  {form.clientType !== "Particulier" && (
                    <div className="sm:col-span-2 grid gap-4 sm:grid-cols-2">
                      <Field label="Raison sociale" required>
                        <input value={form.raisonSociale} onChange={e => update("raisonSociale", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="Enseigne">
                        <input value={form.enseigne} onChange={e => update("enseigne", e.target.value)} className="input-field" />
                      </Field>
                    </div>
                  )}

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
                  <Field label={form.clientType === "Particulier" ? "Téléphone" : "Tél entreprise"}>
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
                    <div className="text-[12px] font-semibold text-[--k-text] mb-2">Sélectionner un contact existant :</div>
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
                    <div className="mt-3 pt-3 border-t border-[--k-border]">
                      <button
                        onClick={() => { setShowNewContactForm(true); setShowContactPicker(false); }}
                        className="flex items-center gap-1.5 text-[13px] font-medium text-[--k-primary] hover:underline"
                      >
                        <Plus className="h-3.5 w-3.5" /> Créer un nouveau contact
                      </button>
                    </div>
                  </div>
                )}
                {showNewContactForm && (
                  <div className="mt-3 rounded-lg border border-[--k-primary-border] bg-[--k-primary-2]/30 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[--k-text]">Nouveau contact</span>
                      <button onClick={() => setShowNewContactForm(false)} className="text-[--k-muted] hover:text-[--k-danger]">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input value={newContact.prenom} onChange={e => setNewContact(c => ({ ...c, prenom: e.target.value }))} placeholder="Prénom *" className="input-field" />
                      <input value={newContact.nom} onChange={e => setNewContact(c => ({ ...c, nom: e.target.value }))} placeholder="Nom *" className="input-field" />
                      <input value={newContact.fonction} onChange={e => setNewContact(c => ({ ...c, fonction: e.target.value }))} placeholder="Fonction" className="input-field" />
                      <input type="email" value={newContact.email} onChange={e => setNewContact(c => ({ ...c, email: e.target.value }))} placeholder="Email *" className="input-field" />
                      <input value={newContact.tel} onChange={e => setNewContact(c => ({ ...c, tel: e.target.value }))} placeholder="Téléphone" className="input-field" />
                    </div>
                    <button
                      onClick={() => {
                        if (newContact.nom && newContact.email) {
                          const contact = {
                            id: Date.now(),
                            nom: `${newContact.prenom} ${newContact.nom}`.trim(),
                            fonction: newContact.fonction,
                            email: newContact.email,
                            tel: newContact.tel,
                            isNew: true,
                          };
                          setContacts(prev => [...prev, contact]);
                          setNewContact({ nom: "", prenom: "", fonction: "", email: "", tel: "" });
                          setShowNewContactForm(false);
                        }
                      }}
                      className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm"
                    >
                      Ajouter ce contact
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Facturation */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[14px] font-bold text-[--k-text]">Facturation</h2>
                <p className="text-[12px] text-[--k-muted] mt-0.5">Contact facturation et modalités de dépôt des factures</p>
              </div>
              <div className="p-5 space-y-4">
                {/* Contact facturation */}
                <Field label="Contact facturation">
                  {contactFacturation ? (
                    <div className="flex items-center justify-between rounded-lg border border-[--k-border] px-3 py-2">
                      <div>
                        <span className="text-[13px] font-medium text-[--k-text]">{contactFacturation.nom}</span>
                        {contactFacturation.fonction && <span className="text-[12px] text-[--k-muted] ml-2">{contactFacturation.fonction}</span>}
                        <span className="text-[12px] text-[--k-muted] ml-2">{contactFacturation.email}</span>
                        {contactFacturation.tel && <span className="text-[12px] text-[--k-muted] ml-2">{contactFacturation.tel}</span>}
                      </div>
                      <button onClick={() => setContactFacturation(null)} className="text-[--k-muted] hover:text-[--k-danger]">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button
                        onClick={() => setShowFacturationContactPicker(!showFacturationContactPicker)}
                        className="flex items-center gap-1.5 rounded-lg border border-dashed border-[--k-border] px-3 py-2 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition w-full"
                      >
                        <Plus className="h-3.5 w-3.5" /> Sélectionner un contact facturation
                      </button>
                      {showFacturationContactPicker && (
                        <div className="mt-2 rounded-lg border border-[--k-border] bg-[--k-surface-2] p-3">
                          <div className="space-y-1">
                            {/* Contacts existants */}
                            {[...MOCK_CONTACTS, ...contacts.filter(c => c.isNew)].map(c => (
                              <button
                                key={c.id}
                                onClick={() => { setContactFacturation(c); setShowFacturationContactPicker(false); }}
                                className="w-full text-left rounded-lg px-3 py-2 text-[13px] hover:bg-white transition"
                              >
                                <span className="font-medium">{c.nom}</span>
                                <span className="text-[--k-muted] ml-2">— {c.email}</span>
                              </button>
                            ))}
                          </div>
                          <p className="text-[11px] text-[--k-muted] mt-2 pt-2 border-t border-[--k-border]">
                            Peut être différent du contact projet (ex: service comptabilité)
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </Field>

                {/* Modalité de dépôt */}
                <Field label="Modalité de dépôt des factures" required>
                  <select value={form.modaliteFacturation} onChange={e => update("modaliteFacturation", e.target.value)} className="input-field">
                    <option value="">Séléctionner</option>
                    {MODALITES_FACTURATION.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
                  </select>
                </Field>

                {/* Chorus-specific fields */}
                {form.modaliteFacturation === "chorus" && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-3">
                    <p className="text-[12px] font-semibold text-blue-800">Informations Chorus Pro</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Field label="N° SIRET">
                        <input value={form.refFacturation} onChange={e => update("refFacturation", e.target.value)} placeholder="Ex: 123 456 789 00012" className="input-field" />
                      </Field>
                      <Field label="Code service (si applicable)">
                        <input value={form.infoFacturation} onChange={e => update("infoFacturation", e.target.value)} placeholder="Ex: COMPTA-01" className="input-field" />
                      </Field>
                    </div>
                  </div>
                )}

                {/* Plateforme-specific fields */}
                {form.modaliteFacturation === "plateforme" && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 space-y-3">
                    <p className="text-[12px] font-semibold text-purple-800">Informations plateforme</p>
                    <Field label="Nom de la plateforme / URL">
                      <input value={form.refFacturation} onChange={e => update("refFacturation", e.target.value)} placeholder="Ex: Coupa, https://..." className="input-field" />
                    </Field>
                  </div>
                )}

                {/* Portail-specific fields */}
                {form.modaliteFacturation === "portail" && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 space-y-3">
                    <p className="text-[12px] font-semibold text-purple-800">Informations portail fournisseur</p>
                    <Field label="URL / identifiants du portail">
                      <input value={form.refFacturation} onChange={e => update("refFacturation", e.target.value)} placeholder="Ex: https://portail.client.fr" className="input-field" />
                    </Field>
                  </div>
                )}

                {/* Autre */}
                {form.modaliteFacturation === "autre" && (
                  <Field label="Précisez">
                    <input value={form.refFacturation} onChange={e => update("refFacturation", e.target.value)} placeholder="Modalité de dépôt..." className="input-field" />
                  </Field>
                )}

                {/* Note facturation collapsible */}
                <CollapsibleComment
                  label="Ajouter une note sur la facturation..."
                  value={form.commentaireFacturation}
                  onChange={val => update("commentaireFacturation", val)}
                  placeholder="Informations complémentaires (n° de bon de commande, adresse de facturation spécifique, etc.)"
                />
              </div>
            </div>

            {/* Commentaire */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm p-5">
              <CollapsibleComment
                label="Ajouter un commentaire client..."
                value={form.commentaire}
                onChange={val => update("commentaire", val)}
                placeholder="Ajouter un commentaire..."
              />
            </div>

            {/* Localisation Google Map */}
            {selectedClient && (
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                  <h2 className="text-[14px] font-bold text-[--k-text]">Localisation du client</h2>
                  <span className="text-[12px] text-[--k-muted]">{form.adresse}, {form.codePostal} {form.ville}</span>
                </div>
                <div className="p-5">
                  <div className="w-full h-36 rounded-lg bg-blue-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-200/60 to-blue-300/40" />
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      <MapPin className="h-6 w-6 text-red-500" />
                      <span className="text-[11px] text-[--k-muted]">{form.adresse}, {form.codePostal} {form.ville}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Opportunité & Devis */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Opportunité & Devis</h2>
                <p className="text-[12px] text-[--k-muted] mt-0.5">Sélectionner l'opportunité et le(s) devis associé(s) à l'événement</p>
              </div>
              <div className="p-5 space-y-4">
                <Field label="Opportunité">
                  <select value={form.opportunite} onChange={e => update("opportunite", e.target.value)} className="input-field">
                    <option value="">Séléctionner</option>
                    {MOCK_OPPORTUNITIES.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                  </select>
                </Field>
                {/* Skip devis toggle */}
                <label className="flex items-center gap-2.5 mb-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={skipDevis}
                    onChange={() => { setSkipDevis(!skipDevis); if (!skipDevis) setSelectedDevis([]); }}
                    className="rounded border-[--k-border] h-4 w-4 accent-[--k-primary]"
                  />
                  <span className="text-[13px] font-medium text-[--k-text]">Pas de devis associé</span>
                </label>

                {skipDevis ? (
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-3">
                    <p className="text-[13px] font-medium text-amber-800">Pourquoi n'y a-t-il pas de devis ?</p>
                    <div className="flex flex-wrap gap-2">
                      {SKIP_DEVIS_REASONS.map(reason => (
                        <button
                          key={reason}
                          onClick={() => setSkipDevisReason(reason)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-[12px] font-medium border transition",
                            skipDevisReason === reason
                              ? "bg-[--k-primary] text-white border-[--k-primary]"
                              : "bg-white text-[--k-text] border-[--k-border] hover:border-[--k-primary] hover:text-[--k-primary]"
                          )}
                        >
                          {reason}
                        </button>
                      ))}
                    </div>
                    {skipDevisReason === "Autre" && (
                      <input
                        value={skipDevisCustomReason}
                        onChange={e => setSkipDevisCustomReason(e.target.value)}
                        placeholder="Précisez la raison..."
                        className="input-field mt-2"
                      />
                    )}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-[--k-border]">
                          <th className="w-10 py-2 px-3"></th>
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
                          <tr
                            key={d.id}
                            onClick={() => setSelectedDevis(prev => prev.includes(d.id) ? prev.filter(x => x !== d.id) : [...prev, d.id])}
                            className={cn(
                              "border-b border-[--k-border] last:border-0 cursor-pointer transition",
                              selectedDevis.includes(d.id) ? "bg-[--k-primary-2]" : "hover:bg-[--k-surface-2]"
                            )}
                          >
                            <td className="py-2.5 px-3">
                              <input
                                type="checkbox"
                                checked={selectedDevis.includes(d.id)}
                                onChange={() => {}}
                                className="rounded border-[--k-border] h-4 w-4 accent-[--k-primary]"
                              />
                            </td>
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
                            <td colSpan={9} className="py-6 text-center text-[13px] text-[--k-muted]">
                              Sélectionnez un client pour voir les devis associés
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    {selectedDevis.length > 0 && (
                      <p className="mt-2 text-[12px] text-[--k-primary] font-medium">
                        {selectedDevis.length} devis sélectionné(s) — les informations seront pré-remplies à l'étape suivante
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* ─── Step 2: Événement ────────────────────── */}
        {currentStep === 2 && (
          <div className="space-y-5">
            {/* Informations événement */}
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
                      options={form.clientType === "Particulier" ? EVENT_TYPES_PARTICULIER : EVENT_TYPES_PRO}
                      placeholder="Séléctionner"
                    />
                  </Field>
                  {/* Responsable(s) - Person picker */}
                  <div className="sm:col-span-2">
                    <Field label="Responsable(s) / Antenne">
                      <div className="relative">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          {selectedResponsables.map(id => {
                            const p = MOCK_RESPONSABLES.find(r => r.id === id);
                            if (!p) return null;
                            return (
                              <span key={id} className="inline-flex items-center gap-1.5 rounded-full bg-[--k-primary-2] pl-1 pr-2.5 py-0.5">
                                <span className={cn("h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white", p.color)}>
                                  {p.prenom[0]}{p.nom[0]}
                                </span>
                                <span className="text-[12px] font-medium text-[--k-primary]">{p.prenom} {p.nom}</span>
                                <button onClick={() => setSelectedResponsables(prev => prev.filter(x => x !== id))} className="text-[--k-primary] hover:text-[--k-danger] ml-0.5">
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[--k-muted]" />
                          <input
                            value={responsableSearch}
                            onChange={e => { setResponsableSearch(e.target.value); setShowResponsablePicker(true); }}
                            onFocus={() => setShowResponsablePicker(true)}
                            placeholder="Rechercher un responsable..."
                            className="input-field pl-8"
                          />
                        </div>
                        {showResponsablePicker && (
                          <div className="absolute z-20 mt-1 w-full max-h-64 overflow-auto rounded-lg border border-[--k-border] bg-white shadow-lg">
                            {MOCK_RESPONSABLES
                              .filter(r => !selectedResponsables.includes(r.id))
                              .filter(r => !responsableSearch || `${r.prenom} ${r.nom} ${r.ville}`.toLowerCase().includes(responsableSearch.toLowerCase()))
                              .map(r => (
                                <button
                                  key={r.id}
                                  onClick={() => {
                                    setSelectedResponsables(prev => [...prev, r.id]);
                                    setResponsableSearch("");
                                    setShowResponsablePicker(false);
                                  }}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[--k-surface-2] transition"
                                >
                                  <span className={cn("h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0", r.color)}>
                                    {r.prenom[0]}{r.nom[0]}
                                  </span>
                                  <div className="min-w-0">
                                    <div className="text-[13px] font-medium text-[--k-text]">{r.prenom} {r.nom}</div>
                                    <div className="text-[11px] text-[--k-muted]">{r.ville}</div>
                                  </div>
                                </button>
                              ))}
                            {MOCK_RESPONSABLES.filter(r => !selectedResponsables.includes(r.id)).filter(r => !responsableSearch || `${r.prenom} ${r.nom} ${r.ville}`.toLowerCase().includes(responsableSearch.toLowerCase())).length === 0 && (
                              <div className="px-3 py-4 text-center text-[13px] text-[--k-muted]">Aucun résultat</div>
                            )}
                          </div>
                        )}
                      </div>
                    </Field>
                  </div>

                  <div className="sm:col-span-2">
                    <CollapsibleComment
                      label="Description événement"
                      value={form.description}
                      onChange={val => update("description", val)}
                      placeholder="Décrivez l'événement..."
                    />
                  </div>

                  {/* Objectifs - Checkboxes */}
                  <div className="sm:col-span-2">
                    <Field label="Objectifs de l'événement / client">
                      <div className="flex flex-wrap gap-2">
                        {OBJECTIFS_EVENT.map(obj => (
                          <button
                            key={obj}
                            onClick={() => {
                              setForm(f => ({
                                ...f,
                                objectifs: f.objectifs.includes(obj)
                                  ? f.objectifs.filter(o => o !== obj)
                                  : [...f.objectifs, obj],
                              }));
                            }}
                            className={cn(
                              "px-3 py-2 rounded-lg text-[13px] font-medium border transition",
                              form.objectifs.includes(obj)
                                ? "bg-[--k-primary] text-white border-[--k-primary] shadow-sm"
                                : "bg-white text-[--k-text] border-[--k-border] hover:border-[--k-primary] hover:text-[--k-primary]"
                            )}
                          >
                            {form.objectifs.includes(obj) && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
                            {obj}
                          </button>
                        ))}
                      </div>
                    </Field>
                  </div>

                  {/* Étiquettes / Tags internes */}
                  <div className="sm:col-span-2">
                    <Field label="Étiquettes / tags">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {INTERNAL_TAGS.map(tag => (
                          <button
                            key={tag}
                            onClick={() => setInternalTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                            className={cn(
                              "px-3 py-1.5 rounded-full text-[12px] font-medium border transition",
                              internalTags.includes(tag)
                                ? "bg-[--k-text] text-white border-[--k-text]"
                                : "bg-white text-[--k-muted] border-[--k-border] hover:border-[--k-text] hover:text-[--k-text]"
                            )}
                          >
                            {internalTags.includes(tag) && <Check className="inline h-3 w-3 mr-1 -mt-0.5" />}
                            {tag}
                          </button>
                        ))}
                      </div>
                      <CollapsibleTagInput
                        value={tagInput}
                        onChange={setTagInput}
                        onAdd={() => {
                          if (tagInput.trim()) {
                            setInternalTags(prev => prev.includes(tagInput.trim()) ? prev : [...prev, tagInput.trim()]);
                            setTagInput("");
                          }
                        }}
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
              <div className="p-5 space-y-4">
                <div className="flex flex-wrap items-end gap-3">
                  <Field label="Période">
                    <select value={form.periode} onChange={e => update("periode", e.target.value)} className="input-field w-auto">
                      <option value="jour">Le jour du</option>
                      <option value="periode">Du</option>
                    </select>
                  </Field>
                  <Field label="Date de l'animation" required>
                    <input type="date" value={form.dateAnimation} onChange={e => update("dateAnimation", e.target.value)} className="input-field" />
                  </Field>
                  {form.periode === "periode" && (
                    <>
                      <span className="pb-2 text-[13px] text-[--k-muted]">au</span>
                      <Field label="Date de fin">
                        <input type="date" value={form.dateAnimationFin} onChange={e => update("dateAnimationFin", e.target.value)} className="input-field" />
                      </Field>
                    </>
                  )}
                </div>
                <Field label="Horaire de l'événement">
                  <RichTextEditor
                    value={form.horaireEvent}
                    onChange={val => update("horaireEvent", val)}
                    placeholder="Précisez les horaires..."
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Début de l'immobilisation du matériel">
                    <input type="date" value={form.debutImmobilisation} onChange={e => update("debutImmobilisation", e.target.value)} className="input-field" />
                  </Field>
                  <Field label="Fin de l'immobilisation du matériel">
                    <input type="date" value={form.finImmobilisation} onChange={e => update("finImmobilisation", e.target.value)} className="input-field" />
                  </Field>
                </div>
                <CollapsibleComment
                  label="Ajouter un commentaire sur les dates..."
                  value={form.commentaireDates}
                  onChange={val => update("commentaireDates", val)}
                  placeholder="Commentaire sur les dates..."
                />
              </div>
            </div>

            {/* Lieu d'événement */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Lieu d'événement</h2>
              </div>
              <div className="p-5">
                <div className="flex gap-5">
                  {/* Left: form fields */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Nom de l'adresse (Usage interne)">
                        <input value={form.lieuNomAdresse} onChange={e => update("lieuNomAdresse", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="Société (facultatif)">
                        <input value={form.lieuSociete} onChange={e => update("lieuSociete", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="Adresse">
                        <input value={form.lieuAdresse} onChange={e => update("lieuAdresse", e.target.value)} placeholder="Indiquez un lieu" className="input-field" />
                      </Field>
                      <Field label="Adresse 2">
                        <input value={form.lieuAdresse2} onChange={e => update("lieuAdresse2", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="CP">
                        <input value={form.lieuCP} onChange={e => update("lieuCP", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="Ville">
                        <input value={form.lieuVille} onChange={e => update("lieuVille", e.target.value)} className="input-field" />
                      </Field>
                      <Field label="Pays">
                        <input value={form.lieuPays} onChange={e => update("lieuPays", e.target.value)} className="input-field" />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <CollapsibleComment
                        label="Ajouter des infos pratiques..."
                        value={form.infoPratiques}
                        onChange={val => update("infoPratiques", val)}
                        placeholder="Informations pratiques sur le lieu..."
                      />
                      <CollapsibleComment
                        label="Ajouter les modalités d'accès..."
                        value={form.modalitesAcces}
                        onChange={val => update("modalitesAcces", val)}
                        placeholder="Modalités d'accès au lieu..."
                      />
                    </div>
                  </div>

                  {/* Right: Google Map */}
                  <div className="hidden lg:block w-64 shrink-0">
                    <div className="w-full h-full min-h-[200px] rounded-lg bg-blue-100 relative overflow-hidden sticky top-4">
                      <div className="absolute inset-0 bg-gradient-to-b from-blue-200/60 to-blue-300/40" />
                      <div className="absolute top-1.5 left-1.5 z-10 flex rounded overflow-hidden border border-[--k-border] bg-white shadow-sm">
                        <button className="px-2 py-1 text-[11px] font-semibold text-[--k-text] bg-white">Plan</button>
                        <button className="px-2 py-1 text-[11px] text-[--k-muted] bg-[--k-surface-2]">Satellite</button>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-red-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents (collapsible) */}
            <CollapsibleSection title="Documents" buttonLabel="Ajouter des documents...">
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-[--k-border] bg-[--k-surface-2]/30 py-8 cursor-pointer hover:border-[--k-primary] hover:bg-[--k-primary-2]/20 transition">
                <span className="inline-flex items-center gap-2 rounded-lg border border-[--k-border] bg-white px-4 py-2 text-[13px] text-[--k-muted] shadow-sm">
                  Cliquer ou glisser vos fichiers ici
                </span>
              </div>
            </CollapsibleSection>

            {/* Contact(s) sur place */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Contact(s) sur place</h2>
                <button
                  onClick={addContactSurPlace}
                  className="h-9 rounded-lg bg-[--k-success] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5"
                >
                  Ajouter un contact
                </button>
              </div>
              <div className="p-5">
                {contactsSurPlace.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-[13px]">
                      <thead>
                        <tr className="border-b border-[--k-border]">
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Prénom (*)</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Nom (*)</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Fonction</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Email (*)</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Téléphone Portable</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Téléphone Fixe</th>
                          <th className="text-left py-2 px-2 text-[12px] font-semibold text-[--k-muted]">Type</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {contactsSurPlace.map(c => (
                          <tr key={c.id} className="border-b border-[--k-border] last:border-0">
                            <td className="py-2 px-2">
                              <input value={c.prenom} onChange={e => updateContactSurPlace(c.id, "prenom", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <input value={c.nom} onChange={e => updateContactSurPlace(c.id, "nom", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <input value={c.fonction} onChange={e => updateContactSurPlace(c.id, "fonction", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <input type="email" value={c.email} onChange={e => updateContactSurPlace(c.id, "email", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <input value={c.telPortable} onChange={e => updateContactSurPlace(c.id, "telPortable", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <input value={c.telFixe} onChange={e => updateContactSurPlace(c.id, "telFixe", e.target.value)} className="input-field" />
                            </td>
                            <td className="py-2 px-2">
                              <select value={c.type} onChange={e => updateContactSurPlace(c.id, "type", e.target.value)} className="input-field">
                                <option value="">Sélectionner</option>
                                <option value="principal">Principal</option>
                                <option value="technique">Technique</option>
                                <option value="commercial">Commercial</option>
                                <option value="logistique">Logistique</option>
                              </select>
                            </td>
                            <td className="py-2 px-2">
                              <button onClick={() => removeContactSurPlace(c.id)} className="text-[--k-muted] hover:text-[--k-danger] transition">
                                <X className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {contactsSurPlace.length === 0 && (
                  <p className="text-[13px] text-[--k-muted]">Aucun contact sur place</p>
                )}
                <div className="mt-4">
                  <CollapsibleComment
                    label="Ajouter un commentaire..."
                    value={form.commentaireSurPlace}
                    onChange={val => update("commentaireSurPlace", val)}
                    placeholder="Commentaire sur les contacts..."
                  />
                </div>
              </div>
            </div>

            {/* Suivi interne */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Suivi interne</h2>
              </div>
              <div className="p-5">
                <Field label="Responsable(s) de projet">
                  <input value={form.responsableProjet} onChange={e => update("responsableProjet", e.target.value)} className="input-field w-full sm:w-1/2" />
                </Field>
              </div>
            </div>

          </div>
        )}

        {/* ─── Step 3: Animation(s) ────────────────── */}
        {currentStep === 3 && (
          <div className="space-y-5">
            {/* Dispositif(s) */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Dispositif(s)</h2>
                {(() => {
                  const usedTypes = form.dispositifs.map(d => d.type);
                  const available = BORNE_TYPES.filter(t => !usedTypes.includes(t));
                  // Always allow "__autre"
                  if (available.length === 0) return (
                    <button
                      onClick={() => setForm(f => ({ ...f, dispositifs: [...f.dispositifs, { id: Date.now(), type: "__autre", qty: 1 }] }))}
                      className="h-9 rounded-lg bg-[--k-success] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5"
                    >
                      <Plus className="h-3.5 w-3.5" /> Autre dispositif
                    </button>
                  );
                  return (
                    <div className="flex items-center gap-2">
                      {available.map(t => (
                        <button
                          key={t}
                          onClick={() => setForm(f => ({ ...f, dispositifs: [...f.dispositifs, { id: Date.now(), type: t, qty: 1 }] }))}
                          className="h-9 rounded-lg border border-dashed border-[--k-border] px-3 text-[12px] font-medium text-[--k-muted] hover:border-[--k-success] hover:text-[--k-success] transition flex items-center gap-1.5"
                        >
                          <Plus className="h-3 w-3" /> {t}
                        </button>
                      ))}
                      <button
                        onClick={() => setForm(f => ({ ...f, dispositifs: [...f.dispositifs, { id: Date.now(), type: "__autre", qty: 1 }] }))}
                        className="h-9 rounded-lg border border-dashed border-[--k-border] px-3 text-[12px] font-medium text-[--k-muted] hover:border-[--k-success] hover:text-[--k-success] transition flex items-center gap-1.5"
                      >
                        <Plus className="h-3 w-3" /> Autre...
                      </button>
                    </div>
                  );
                })()}
              </div>
              <div className="p-5">
                <div className="space-y-3">
                  {form.dispositifs.map((d, i) => (
                    <div key={d.id} className="flex items-start gap-3 rounded-lg border border-[--k-border] p-3">
                      <div className="flex-1 grid gap-3 sm:grid-cols-[180px_80px_1fr]">
                        <Field label={i === 0 ? "Type" : undefined}>
                          <select
                            value={d.type}
                            onChange={e => setForm(f => ({ ...f, dispositifs: f.dispositifs.map(x => x.id === d.id ? { ...x, type: e.target.value } : x) }))}
                            className="input-field"
                          >
                            {BORNE_TYPES.map(t => {
                              const taken = form.dispositifs.some(x => x.id !== d.id && x.type === t);
                              return <option key={t} value={t} disabled={taken}>{t}{taken ? " (déjà ajouté)" : ""}</option>;
                            })}
                            <option value="__autre">Autre...</option>
                          </select>
                        </Field>
                        <Field label={i === 0 ? "Qté" : undefined}>
                          <input
                            type="number"
                            min="1"
                            value={d.qty}
                            onChange={e => setForm(f => ({ ...f, dispositifs: f.dispositifs.map(x => x.id === d.id ? { ...x, qty: parseInt(e.target.value) || 1 } : x) }))}
                            className="input-field text-center"
                          />
                        </Field>
                        <div className={i === 0 ? "pt-[22px]" : ""}>
                          <button
                            onClick={() => alert("Recherche de bornes à venir")}
                            className="h-9 rounded-lg border border-dashed border-[--k-border] px-3 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition flex items-center gap-1.5 whitespace-nowrap"
                          >
                            <Search className="h-3.5 w-3.5" />
                            {d.bornes?.length > 0 ? `${d.bornes.length} borne(s)` : "Affecter des bornes"}
                          </button>
                        </div>
                        {d.type === "__autre" && (
                          <div className="sm:col-span-3">
                            <Field label="Nom du dispositif">
                              <input
                                value={d.autreNom || ""}
                                onChange={e => setForm(f => ({ ...f, dispositifs: f.dispositifs.map(x => x.id === d.id ? { ...x, autreNom: e.target.value } : x) }))}
                                placeholder="Ex: Mur digital, Borne tactile..."
                                className="input-field"
                              />
                            </Field>
                          </div>
                        )}
                      </div>
                      {form.dispositifs.length > 1 && (
                        <button
                          onClick={() => setForm(f => ({ ...f, dispositifs: f.dispositifs.filter(x => x.id !== d.id) }))}
                          className="mt-6 text-[--k-muted] hover:text-[--k-danger] transition shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {form.dispositifs.length > 0 && (
                  <p className="mt-3 text-[12px] text-[--k-muted]">
                    Total : {form.dispositifs.reduce((sum, d) => sum + d.qty, 0)} dispositif(s)
                  </p>
                )}
              </div>
            </div>

            {/* Animation cards */}
            {form.animations.map((anim, ai) => {
              const catalog = ANIMATION_CATALOG.find(c => c.id === anim.catalogId);
              if (!catalog) return null;
              const Icon = catalog.icon;
              return (
                <div key={ai} className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                  <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-[--k-primary-2]/30 text-[--k-primary]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h2 className="text-[16px] font-bold text-[--k-text]">{catalog.label}</h2>
                    </div>
                    <button
                      onClick={() => setForm(f => ({ ...f, animations: f.animations.filter((_, i) => i !== ai) }))}
                      className="h-8 rounded-lg border border-[--k-border] px-3 text-[12px] font-medium text-[--k-muted] hover:border-[--k-danger] hover:text-[--k-danger] transition flex items-center gap-1.5"
                    >
                      <X className="h-3.5 w-3.5" /> Retirer
                    </button>
                  </div>
                  <div className="p-5 space-y-5">
                    {catalog.customName && (
                      <div>
                        <Field label="Nom de l'animation">
                          <input
                            value={anim.customName}
                            onChange={e => setForm(f => ({ ...f, animations: f.animations.map((a, i) => i === ai ? { ...a, customName: e.target.value } : a) }))}
                            placeholder="Ex: Animation sur-mesure..."
                            className="input-field"
                          />
                        </Field>
                      </div>
                    )}
                    {catalog.sections.length > 0 ? catalog.sections.map(section => (
                      <div key={section.key}>
                        <p className="text-[12px] font-semibold text-[--k-muted] uppercase tracking-wide mb-2">{section.label}</p>
                        <div className="grid gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-3">
                          {section.options.map(opt => (
                            <label key={opt} className="flex items-center gap-2.5 cursor-pointer py-1.5">
                              <input
                                type="checkbox"
                                checked={anim.selectedOptions.includes(opt)}
                                onChange={() => {
                                  setForm(f => ({
                                    ...f,
                                    animations: f.animations.map((a, i) => i === ai ? {
                                      ...a,
                                      selectedOptions: a.selectedOptions.includes(opt)
                                        ? a.selectedOptions.filter(o => o !== opt)
                                        : [...a.selectedOptions, opt],
                                    } : a),
                                  }));
                                }}
                                className="rounded border-[--k-border] h-4 w-4"
                              />
                              <span className="text-[13px] text-[--k-text]">{opt}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-2">
                          <CollapsibleComment
                            label={`Commentaire — ${section.label}`}
                            value={anim.comments?.[section.key] || ""}
                            onChange={val => setForm(f => ({
                              ...f,
                              animations: f.animations.map((a, i) => i === ai ? {
                                ...a,
                                comments: { ...a.comments, [section.key]: val },
                              } : a),
                            }))}
                            placeholder={`Précisions sur ${section.label.toLowerCase()}...`}
                          />
                        </div>
                      </div>
                    )) : !catalog.customName && (
                      <p className="text-[13px] text-[--k-muted]">Aucune option disponible</p>
                    )}
                    {catalog.customName && (
                      <CollapsibleComment
                        label="Commentaire"
                        value={anim.comments?.general || ""}
                        onChange={val => setForm(f => ({
                          ...f,
                          animations: f.animations.map((a, i) => i === ai ? {
                            ...a,
                            comments: { ...a.comments, general: val },
                          } : a),
                        }))}
                        placeholder="Précisions sur cette animation..."
                      />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add animation picker */}
            {(() => {
              const usedIds = form.animations.map(a => a.catalogId);
              const available = ANIMATION_CATALOG.filter(c => !usedIds.includes(c.id) || c.id === "autre");
              if (available.length === 0) return null;
              return (
                <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm p-5">
                  <p className="text-[13px] font-semibold text-[--k-text] mb-3">Ajouter une animation</p>
                  <div className="flex flex-wrap gap-2">
                    {available.map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setForm(f => ({ ...f, animations: [...f.animations, { catalogId: cat.id, selectedOptions: [], comments: {}, customName: "" }] }))}
                          className="flex items-center gap-2 rounded-lg border border-dashed border-[--k-border] px-3 py-2 text-[13px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] hover:bg-[--k-primary-2]/10 transition"
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

          </div>
        )}

        {/* ─── Step 4: Créa ─────────────────────────── */}
        {currentStep === 4 && (
          <div className="space-y-5">
            {/* Créa / Supports graphiques */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Créa / Supports graphiques</h2>
              </div>
              <div className="p-5 space-y-5">
                {/* Création réalisée par */}
                <div>
                  <p className="text-[13px] font-semibold text-[--k-text] mb-2">La création graphique de l'animation est réalisée <span className="text-[--k-danger]">*</span> :</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="creaRealisee" checked={form.creaRealisee === "nous"} onChange={() => update("creaRealisee", "nous")} className="accent-[--k-primary]" />
                      Par nos soins
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="creaRealisee" checked={form.creaRealisee === "client"} onChange={() => update("creaRealisee", "client")} className="accent-[--k-primary]" />
                      Par le client
                    </label>
                  </div>
                </div>

                {/* Supports à créer */}
                <div>
                  <p className="text-[13px] font-semibold text-[--k-text] mb-2">Y-a-t-il des supports à créer ? (magnet/ photocall...)</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="supportsACreer" checked={form.supportsACreer === "non"} onChange={() => update("supportsACreer", "non")} className="accent-[--k-primary]" />
                      Non
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="supportsACreer" checked={form.supportsACreer === "oui"} onChange={() => update("supportsACreer", "oui")} className="accent-[--k-primary]" />
                      Oui
                    </label>
                  </div>
                </div>

                {/* Supports à imprimer */}
                <div>
                  <p className="text-[13px] font-semibold text-[--k-text] mb-2">Y-a-t-il des supports à imprimer ? (magnet/ photocall...)</p>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="supportsAImprimer" checked={form.supportsAImprimer === "non"} onChange={() => update("supportsAImprimer", "non")} className="accent-[--k-primary]" />
                      Non
                    </label>
                    <label className="flex items-center gap-2 text-[13px] text-[--k-text] cursor-pointer">
                      <input type="radio" name="supportsAImprimer" checked={form.supportsAImprimer === "oui"} onChange={() => update("supportsAImprimer", "oui")} className="accent-[--k-primary]" />
                      Oui
                    </label>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <CollapsibleComment
                  label="Ajouter des informations complémentaires..."
                  value={form.infosComplementairesCrea}
                  onChange={val => update("infosComplementairesCrea", val)}
                  placeholder="Informations complémentaires sur la création graphique..."
                />
              </div>
            </div>

            {/* Contact(s) création graphique */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
                <div>
                  <h2 className="text-[14px] font-bold text-[--k-text]">Contact(s) création graphique</h2>
                  <p className="text-[12px] text-[--k-muted] mt-0.5">
                    {contactsCrea.length === 0 ? "Aucun contact" : `${contactsCrea.length} contact(s)`}
                  </p>
                </div>
                <button
                  onClick={() => setShowCreaContactPicker(!showCreaContactPicker)}
                  className="h-9 rounded-lg bg-[--k-primary] px-4 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm"
                >
                  Ajouter un contact
                </button>
              </div>
              <div className="p-5">
                {contactsCrea.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {contactsCrea.map(c => (
                      <div key={c.id} className="flex items-center justify-between rounded-lg border border-[--k-border] px-3 py-2">
                        <div>
                          <span className="text-[13px] font-medium text-[--k-text]">{c.nom}</span>
                          <span className="text-[12px] text-[--k-muted] ml-2">{c.fonction}</span>
                          <span className="text-[12px] text-[--k-muted] ml-2">{c.email}</span>
                        </div>
                        <button onClick={() => setContactsCrea(prev => prev.filter(x => x.id !== c.id))} className="text-[--k-muted] hover:text-[--k-danger]">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {showCreaContactPicker && (
                  <div className="rounded-lg border border-[--k-border] bg-[--k-surface-2] p-3 mb-4">
                    <div className="space-y-1">
                      {MOCK_CONTACTS.filter(c => !contactsCrea.find(x => x.id === c.id)).map(c => (
                        <button
                          key={c.id}
                          onClick={() => { setContactsCrea(prev => [...prev, c]); setShowCreaContactPicker(false); }}
                          className="w-full text-left rounded-lg px-3 py-2 text-[13px] hover:bg-white transition"
                        >
                          <span className="font-medium">{c.nom}</span>
                          <span className="text-[--k-muted] ml-2">— {c.fonction}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <CollapsibleComment
                  label="Ajouter un commentaire..."
                  value={form.commentaireCrea}
                  onChange={val => update("commentaireCrea", val)}
                  placeholder="Commentaire sur la création graphique..."
                />
              </div>
            </div>

            {/* Pièces jointe */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="border-b border-[--k-border] px-5 py-3">
                <h2 className="text-[16px] font-bold text-[--k-text]">Pièces jointe</h2>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-[--k-border] bg-[--k-surface-2]/30 py-12 cursor-pointer hover:border-[--k-primary] hover:bg-[--k-primary-2]/20 transition">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-[--k-border] bg-white px-4 py-2 text-[13px] text-[--k-muted] shadow-sm">
                    Cliquer ou glisser vos fichiers ici
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ─── Step 5: Logistique ──────────────────── */}
        {currentStep === 5 && (
          <div className="space-y-5">
            {/* Rappel des dates */}
            <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
              <div className="px-5 py-4">
                <p className="text-[15px] font-medium text-[--k-text]">
                  Rappel des dates de l'événement : {form.dateAnimation
                    ? `le ${new Date(form.dateAnimation).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short", year: "numeric" })}`
                    : "le Dimanche 15 Fev 2026"}
                </p>
              </div>
            </div>

            {/* Logistique aller / retour — 50/50 */}
            <div className="grid gap-5 lg:grid-cols-2">
              {/* Aller */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="border-b border-[--k-border] px-5 py-3">
                  <h2 className="text-[16px] font-bold text-[--k-text]">Logistique aller</h2>
                </div>
                <div className="p-5 space-y-4">
                  <Field label="Type d'installation / envoi" required>
                    <SelectWithClear
                      value={form.typeInstallation}
                      onChange={val => update("typeInstallation", val)}
                      options={TYPES_INSTALLATION}
                      placeholder="Séléctionner"
                    />
                  </Field>
                  <button className="h-8 rounded-lg bg-[--k-primary] px-3 text-[12px] font-medium text-white hover:brightness-110 transition shadow-sm">
                    Ajouter un colis transporteur
                  </button>
                  <CollapsibleComment
                    label="Commentaire interne..."
                    value={form.commentaireAllerInterne}
                    onChange={val => update("commentaireAllerInterne", val)}
                    placeholder="Commentaire interne..."
                  />
                  <CollapsibleComment
                    label="Note pour le client..."
                    value={form.noteAllerClient}
                    onChange={val => update("noteAllerClient", val)}
                    placeholder="Note visible par le client..."
                  />
                </div>
              </div>

              {/* Retour */}
              <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
                <div className="border-b border-[--k-border] px-5 py-3">
                  <h2 className="text-[16px] font-bold text-[--k-text]">Logistique retour</h2>
                </div>
                <div className="p-5 space-y-4">
                  <Field label="Type de désinstallation / retour" required>
                    <SelectWithClear
                      value={form.typeRetour}
                      onChange={val => update("typeRetour", val)}
                      options={TYPES_RETOUR}
                      placeholder="Séléctionner"
                    />
                  </Field>
                  {form.typeRetour && (
                    <>
                      <Field label="Jour retour">
                        <input type="date" value={form.jourRetour} onChange={e => update("jourRetour", e.target.value)} className="input-field" />
                      </Field>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-1.5 text-[12px] text-[--k-text] cursor-pointer">
                          <input type="radio" name="heureRetourMode" checked={form.heureRetourMode === "precise"} onChange={() => update("heureRetourMode", "precise")} className="accent-[--k-primary]" />
                          Heure précise
                        </label>
                        <label className="flex items-center gap-1.5 text-[12px] text-[--k-text] cursor-pointer">
                          <input type="radio" name="heureRetourMode" checked={form.heureRetourMode === "tranche"} onChange={() => update("heureRetourMode", "tranche")} className="accent-[--k-primary]" />
                          Tranche horaire
                        </label>
                      </div>
                      {form.heureRetourMode === "precise" ? (
                        <Field label="Heure retour">
                          <input type="time" value={form.heureRetour} onChange={e => update("heureRetour", e.target.value)} className="input-field" />
                        </Field>
                      ) : (
                        <div className="grid gap-3 grid-cols-2">
                          <Field label="Début">
                            <input type="time" value={form.heureRetourDebut} onChange={e => update("heureRetourDebut", e.target.value)} className="input-field" />
                          </Field>
                          <Field label="Fin">
                            <input type="time" value={form.heureRetourFin} onChange={e => update("heureRetourFin", e.target.value)} className="input-field" />
                          </Field>
                        </div>
                      )}
                    </>
                  )}
                  <button className="h-8 rounded-lg bg-[--k-primary] px-3 text-[12px] font-medium text-white hover:brightness-110 transition shadow-sm">
                    Ajouter un colis transporteur
                  </button>
                  <CollapsibleComment
                    label="Commentaire interne..."
                    value={form.commentaireRetourInterne}
                    onChange={val => update("commentaireRetourInterne", val)}
                    placeholder="Commentaire interne..."
                  />
                  <CollapsibleComment
                    label="Note pour le client..."
                    value={form.noteRetourClient}
                    onChange={val => update("noteRetourClient", val)}
                    placeholder="Note visible par le client..."
                  />
                </div>
              </div>
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
                  <RecapRow label="Date animation" value={form.dateAnimation || "—"} />
                  {form.periode === "periode" && <RecapRow label="Date fin" value={form.dateAnimationFin || "—"} />}
                  <RecapRow label="Immobilisation" value={form.debutImmobilisation && form.finImmobilisation ? `${form.debutImmobilisation} → ${form.finImmobilisation}` : "—"} />
                  <RecapRow label="Lieu" value={[form.lieuNomAdresse, form.lieuAdresse, form.lieuCP, form.lieuVille].filter(Boolean).join(", ") || "—"} />
                  <RecapRow label="Objectifs" value={form.objectifs.length > 0 ? form.objectifs.join(", ") : "—"} />
                  <RecapRow label="Responsable(s)" value={selectedResponsables.map(id => { const r = MOCK_RESPONSABLES.find(x => x.id === id); return r ? `${r.prenom} ${r.nom}` : ""; }).filter(Boolean).join(", ") || "—"} />
                  {internalTags.length > 0 && <RecapRow label="Tags" value={internalTags.join(", ")} />}
                  {contactsSurPlace.length > 0 && <RecapRow label="Contacts sur place" value={contactsSurPlace.map(c => `${c.prenom} ${c.nom}`).filter(s => s.trim()).join(", ") || "—"} />}
                </RecapSection>

                <RecapSection title="Animation(s)">
                  {form.dispositifs.map((d) => (
                    <RecapRow key={d.id} label={d.type === "__autre" ? (d.autreNom || "Autre") : d.type} value={`×${d.qty}`} />
                  ))}
                  {form.animations.map((anim, i) => {
                    const cat = ANIMATION_CATALOG.find(c => c.id === anim.catalogId);
                    const label = cat?.customName && anim.customName ? anim.customName : (cat?.label || anim.catalogId);
                    if (cat?.sections?.length > 0) {
                      return (
                        <React.Fragment key={i}>
                          <RecapRow label={label} value="" />
                          {cat.sections.map(s => {
                            const sectionOpts = s.options.filter(o => anim.selectedOptions.includes(o));
                            return sectionOpts.length > 0 ? <RecapRow key={s.key} label={`  ${s.label}`} value={sectionOpts.join(", ")} /> : null;
                          })}
                        </React.Fragment>
                      );
                    }
                    return <RecapRow key={i} label={label} value={anim.selectedOptions.length > 0 ? anim.selectedOptions.join(", ") : "—"} />;
                  })}
                </RecapSection>

                <RecapSection title="Créa">
                  <RecapRow label="Création par" value={form.creaRealisee === "nous" ? "Nos soins" : "Le client"} />
                  <RecapRow label="Supports à créer" value={form.supportsACreer === "oui" ? "Oui" : "Non"} />
                  <RecapRow label="Supports à imprimer" value={form.supportsAImprimer === "oui" ? "Oui" : "Non"} />
                </RecapSection>

                <RecapSection title="Logistique">
                  <RecapRow label="Installation / envoi" value={form.typeInstallation || "—"} />
                  <RecapRow label="Retour" value={form.typeRetour || "—"} />
                  {form.jourRetour && <RecapRow label="Jour retour" value={form.jourRetour} />}
                  {form.heureRetour && <RecapRow label="Heure retour" value={form.heureRetour} />}
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

          </div>
        )}
      </div>

      {/* ── Sticky Footer Navigation ──────────────────── */}
      <div className="sticky bottom-0 z-10 -mx-3 md:-mx-5 -mb-3 md:-mb-5 border-t border-[--k-border] bg-white/90 backdrop-blur-sm px-5 py-3">
        <div className="flex items-center justify-between">
          {currentStep > 1 ? (
            <button onClick={goPrev} className="h-10 rounded-lg border border-[--k-border] px-6 text-[13px] font-medium text-[--k-text] hover:bg-[--k-surface-2] transition flex items-center gap-1.5">
              <ChevronLeft className="h-4 w-4" /> Précédent
            </button>
          ) : <div />}
          <span className="text-[13px] text-[--k-muted] font-medium">
            Étape {currentStep}/{STEPS.length} — {STEPS[currentStep - 1].label}
          </span>
          {currentStep < 6 ? (
            <button onClick={goNext} className="h-10 rounded-lg bg-[--k-primary] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
              Suivant <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button className="h-10 rounded-lg bg-[--k-success] px-6 text-[13px] font-medium text-white hover:brightness-110 transition shadow-sm flex items-center gap-1.5">
              <Check className="h-4 w-4" /> Créer l'événement
            </button>
          )}
        </div>
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

function CollapsibleSection({ title, buttonLabel, children }) {
  const [open, setOpen] = useState(false);
  return open ? (
    <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm">
      <div className="flex items-center justify-between border-b border-[--k-border] px-5 py-3">
        <h2 className="text-[16px] font-bold text-[--k-text]">{title}</h2>
        <button onClick={() => setOpen(false)} className="text-[--k-muted] hover:text-[--k-danger]">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="p-5">{children}</div>
    </div>
  ) : (
    <div className="bg-white rounded-2xl border border-[--k-border] shadow-sm p-4">
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-dashed border-[--k-border] px-3 py-2 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition w-full"
      >
        <Plus className="h-3.5 w-3.5" />
        {buttonLabel || title}
      </button>
    </div>
  );
}

function CollapsibleComment({ label, value, onChange, placeholder }) {
  const [open, setOpen] = useState(!!value);
  return open ? (
    <Field label={label}>
      <RichTextEditor value={value} onChange={onChange} placeholder={placeholder} />
    </Field>
  ) : (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-2 rounded-lg border border-dashed border-[--k-border] px-3 py-2 text-[12px] text-[--k-muted] hover:border-[--k-primary] hover:text-[--k-primary] transition w-full"
    >
      <Plus className="h-3.5 w-3.5" />
      {label || "Ajouter un commentaire..."}
    </button>
  );
}

function CollapsibleTagInput({ value, onChange, onAdd }) {
  const [open, setOpen] = useState(false);
  return open ? (
    <div className="flex items-center gap-2">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") { onAdd(); } }}
        placeholder="Tag personnalisé..."
        className="input-field flex-1"
        autoFocus
      />
      <button onClick={onAdd} className="h-9 rounded-lg bg-[--k-text] px-3 text-[12px] font-medium text-white hover:brightness-110 transition">
        <Plus className="h-3.5 w-3.5" />
      </button>
      <button onClick={() => { onChange(""); setOpen(false); }} className="text-[--k-muted] hover:text-[--k-danger]">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  ) : (
    <button
      onClick={() => setOpen(true)}
      className="flex items-center gap-1.5 text-[12px] text-[--k-muted] hover:text-[--k-primary] transition mt-1"
    >
      <Plus className="h-3 w-3" /> Tag personnalisé...
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
