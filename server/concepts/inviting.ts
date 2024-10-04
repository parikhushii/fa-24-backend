import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

export interface InvitationDoc extends BaseDoc {
  from: ObjectId;
  to: ObjectId;
  status: "pending" | "rejected" | "accepted";
}

export default class InvitingConcept {
  public readonly invitations: DocCollection<InvitationDoc>;
  private readonly capacity: number;
  private queue: InvitationDoc[];

  /**
   * Make an instance of Inviting.
   */
  constructor(collectionName: string, capacity: number) {
    this.invitations = new DocCollection<InvitationDoc>(collectionName);
    this.capacity = capacity;
    this.queue = [];
  }

  async getPendingInvitations(user: ObjectId) {
    return await this.invitations.readMany({ to: user, status: "pending" });
  }

  async sendInvitation(from: ObjectId, to: ObjectId) {
    if (this.queue.length >= this.capacity) {
      throw new NotAllowedError("Invitation queue is full.");
    }

    const existingInvitation = await this.invitations.readOne({ from, to, status: "pending" });
    if (existingInvitation) {
      throw new NotAllowedError("Invitation already sent.");
    }

    const newInvitation: InvitationDoc = { from, to, status: "pending" };
    this.queue.push(newInvitation);
    await this.invitations.createOne(newInvitation);
    return { msg: "Invitation sent!" };
  }

  async acceptInvitation(from: ObjectId, to: ObjectId) {
    const invitation = await this.invitations.readOne({ from, to, status: "pending" });
    if (!invitation) {
      throw new NotFoundError("Invitation not found.");
    }

    // Some problems here
    // await this.invitations.updateMany(invitation, { status: "accepted" });
    // this.queue = this.queue.filter(inv => inv.from !== from || inv.to !== to); // Remove from queue
    // return { msg: "Invitation accepted!" };
  }

  async rejectInvitation(from: ObjectId, to: ObjectId) {
    const invitation = await this.invitations.readOne({ from, to, status: "pending" });
    if (!invitation) {
      throw new NotFoundError("Invitation not found.");
    }

    // Some problems here, also
    // await this.invitations.updateMany(invitation.id, { status: "rejected" });
    // this.queue = this.queue.filter(inv => inv.from !== from || inv.to !== to); // Remove from queue
    // return { msg: "Invitation rejected!" };
  }
}
