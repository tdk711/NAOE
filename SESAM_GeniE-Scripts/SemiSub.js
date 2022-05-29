//Exported using: GeniE V7.10-03 started 27-Oct-2021 11:47:00
//Units
GenieRules.Units.setInputUnit(Angle, "deg");

//***** PROPERTIES *****//
//Sections
Main_Col = PipeSection(6.5 m, 0.03 m);
Upper_Col = PipeSection(12 m, 0.06 m);
Base_Col = PipeSection(24 m, 0.06 m);
Brace = PipeSection(1.6 m, 0.0175 m);

//Materials
Steel = MaterialLinear(550000000 Pa, 8500 kg/m^3, 2.1e+11 Pa, 0.3, 1.2e-05 delC^-1, 0.03 N*s/m);

//***** RULES *****//
//Compatibility Rules
GenieRules.Compatibility.version = "V7.10-3";
GenieRules.Compatibility.enable(SetDefaultNames, true);
GenieRules.Compatibility.enable(CaseInsensitiveFunctions, true);
GenieRules.Compatibility.enable(JournalledDefaultPrefix, true);
GenieRules.Compatibility.enable(SimplifyTopologyEnhancedVertexRemoval, true);
GenieRules.Compatibility.enable(PlateSnapping, true);
GenieRules.Compatibility.enable(PlateSortingCOGFirst, true);
GenieRules.Compatibility.enable(CurveSnapping, true);
GenieRules.Compatibility.enable(DefaultLongFemNames, true);
GenieRules.Compatibility.enable(DefaultEccentricHinghes, true);
GenieRules.Compatibility.enable(AutomaticallySaveModelAfterAnalysis, false);
GenieRules.Compatibility.enable(ValidateTransforms, true);
GenieRules.Compatibility.enable(CheckPlatesForErrorsDuringCreation, true);
GenieRules.Compatibility.enable(UseTopologySimplificationVersion7, true);
GenieRules.Compatibility.enable(UseSpliceVersionV, true);
GenieRules.Compatibility.enable(PreferLinearDependencies, true);
GenieRules.Compatibility.enable(PostponeFEMFileWrite, true);
GenieRules.Compatibility.enable(PostponeLoadApplication, true);
GenieRules.Compatibility.enable(UseSestra10, true);
GenieRules.Compatibility.enable(BucklingCapacityForSegmentedMembers, true);
GenieRules.Compatibility.enable(AlternativeJointBraceClassification, true);
GenieRules.Compatibility.enable(UseAutoSegmentation, false);
GenieRules.Compatibility.enable(AccurateCorrosionAddition, true);

//Connected Move Rules
GenieRules.ConnectedMove.useStructuralPoints = false;
GenieRules.ConnectedMove.defaultConnected = false;
GenieRules.ConnectedMove.rearrangeXJoints = false;

//Geometry Rules
GenieRules.Geometry.beamTopologySnapping = true;
GenieRules.Geometry.guideCurveTopologySnapping = true;
GenieRules.Geometry.creationGrouping = cgGroupingOff;

//Joint Creation Rules
GenieRules.JointCreation.autoGenerate = false;
GenieRules.JointCreation.selectionAware = false;
GenieRules.JointCreation.exclude(geFreeThroughBeams, true);
GenieRules.JointCreation.exclude(geThroughBeamPure, true);
GenieRules.JointCreation.exclude(geThroughBeams, false);
GenieRules.JointCreation.exclude(geFreeBeamEnds, true);
GenieRules.JointCreation.exclude(ge2BeamAligned, true);
GenieRules.JointCreation.exclude(geBeamEnds, false);

//JointDesign Rules
GenieRules.JointDesign.setDefaultCanRule(0.25, 0.3 m);
GenieRules.JointDesign.setDefaultStubRule(1, 0.6 m);
GenieRules.JointDesign.coneAngle = 9.462322208 deg;
GenieRules.JointDesign.minimumGap = 0.0508 m;
GenieRules.JointDesign.gapTolerance = 0.001 m;
GenieRules.JointDesign.planeTolerance = 1 deg;
GenieRules.JointDesign.braceAngleMoveLimit = 10 deg;
GenieRules.JointDesign.chordAlignmentTolerance = 5 deg;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.flushBraces = false;
GenieRules.JointDesign.iterations = 2;
GenieRules.JointDesign.AutoAdjustSegmentLength = false;

//Local Joint Flexibility (LJF) Rules
GenieRules.LJF.method = ljfBuitrago1993;
GenieRules.LJF.setLimit(ljfAxial, 0.1, 5);
GenieRules.LJF.setLimit(ljfIPB, 0.1, 5);
GenieRules.LJF.setLimit(ljfOPB, 0.1, 5);

//Meshing rules
GenieRules.Meshing.elementType = mp1stOrder;
GenieRules.Meshing.superElementType = 1;
GenieRules.Meshing.autoSimplifyTopology = true;
GenieRules.Meshing.autoSplitPeriodicGeometry = false;
GenieRules.Meshing.repairSplitTopology = false;
GenieRules.Meshing.preference(mpPreferRectangularMesh, false);
GenieRules.Meshing.preference(mpAllowTriangularElements, true);
GenieRules.Meshing.preference(mpPreferPointMassAsNodeMass, true);
GenieRules.Meshing.preference(mpUseDrillingElements, false);
GenieRules.Meshing.preference(mpUseEccentricHinges, true);
GenieRules.Meshing.eliminateInternalEdges = true;
GenieRules.Meshing.eliminateInternalVertices = true;
GenieRules.Meshing.preference(mpIncludeUnusedProperties, false);
GenieRules.Meshing.preference(mpEliminateInternalEccentricities, false);
GenieRules.Meshing.preference(mpIgnoreFilletRadius, false);
GenieRules.Meshing.preference(mpPreferLinearDependencies, true);
GenieRules.Meshing.preference(mpUseLongLoadcaseNames, true);
GenieRules.Meshing.preference(mpUseLongSetNames, true);
GenieRules.Meshing.preference(mpUseLongPropertyNames, true);
GenieRules.Meshing.preference(mpMeshDensityRounded, false);
GenieRules.Meshing.scantlings = msGross;
GenieRules.Meshing.ignoreEccentricities = false;
GenieRules.Meshing.useCocentricBeams = false;
GenieRules.Meshing.faceMeshStrategy = SesamQuadMesher;
GenieRules.Meshing.edgeMeshStrategy = UniformDistributionEdge;
GenieRules.Meshing.activate(mpMaxAngle, mpFail, true);
GenieRules.Meshing.setLimit(mpMaxAngle, mpFail, 179 deg);
GenieRules.Meshing.activate(mpMaxAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxAngle, mpSplit, 165 deg);
GenieRules.Meshing.activate(mpMinAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpFail, 1 deg);
GenieRules.Meshing.activate(mpMinAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinAngle, mpSplit, 15 deg);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpFail, 10);
GenieRules.Meshing.activate(mpMaxRelativeJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxRelativeJacobi, mpSplit, 5);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpFail, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpFail, 0);
GenieRules.Meshing.activate(mpMinNormalizedJacobi, mpSplit, false);
GenieRules.Meshing.setLimit(mpMinNormalizedJacobi, mpSplit, 0.2);
GenieRules.Meshing.activate(mpMinEdge, false);
GenieRules.Meshing.setLimit(mpMinEdge, 0.1);
GenieRules.Meshing.activate(mpMinEdgeByLength, false);
GenieRules.Meshing.setLimit(mpMinEdgeByLength, 0 m);
GenieRules.Meshing.activate(mpMinNonConceptualEdge, false);
GenieRules.Meshing.setLimit(mpMinNonConceptualEdge, 1);
GenieRules.Meshing.activate(mpMaxChord, false);
GenieRules.Meshing.setLimit(mpMaxChord, 0.2);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpFail, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpFail, 30 deg);
GenieRules.Meshing.activate(mpMaxTwistAngle, mpSplit, false);
GenieRules.Meshing.setLimit(mpMaxTwistAngle, mpSplit, 10 deg);
GenieRules.Meshing.activate(mpMinMaxDensityRatio, false);
GenieRules.Meshing.setLimit(mpMinMaxDensityRatio, 0.1);
GenieRules.Meshing.basicLCfactor = 1;
GenieRules.Meshing.analysisFolders = true;
GenieRules.Meshing.preference(mpAdjustNumberOfElements, true);
GenieRules.Meshing.useUniformizedFaceParameterization = false;
GenieRules.Meshing.longitudinalMassOnNonStructuralElements = true;

//Tolerances Rules
GenieRules.Tolerances.angleTolerance = 2 deg;
GenieRules.Tolerances.pointTolerance = 0.01 m;
GenieRules.Tolerances.useTolerantModelling = true;

//Set Rules
GenieRules.Sets.scriptCompact = true;

//Beam Creation Rules
GenieRules.BeamCreation.DefaultCurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//Beam Creation Rules
GenieRules.Transformation.CopyTransformerMethod = tmUseModelTransformer;

//***** STRUCTURE *****//
//Plates
Steel.setDefault();

Main_Col.setDefault();
MC = Beam(Point(0 m,0 m,10 m), Point(0 m,0 m,-20 m));
MC.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Upper_Col.setDefault();
UC1 = Beam(Point(14.43 m,25 m,-14 m), Point(14.43 m,25 m,12 m));
UC1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

UC2 = Beam(Point(-28.87 m,0 m,-14 m), Point(-28.87 m,0 m,12 m));
UC2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

UC3 = Beam(Point(14.43 m,-25 m,-14 m), Point(14.43 m,-25 m,12 m));
UC3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Base_Col.setDefault();
BC1 = Beam(Point(14.43 m,25 m,-20 m), Point(14.43 m,25 m,-14 m));
BC1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

BC2 = Beam(Point(-28.87 m,0 m,-14 m), Point(-28.87 m,0 m,-20 m));
BC2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

BC3 = Beam(Point(14.43 m,-25 m,-14 m), Point(14.43 m,-25 m,-20 m));
BC3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

Brace.setDefault();
DU1 = Beam(Point(9.2 m,22 m,10 m), Point(-23.67 m,3 m,10 m));
DU1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

DU2 = Beam(Point(-23.67 m,-3 m,10 m), Point(9.2 m,-22 m,10 m));
DU2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

DU3 = Beam(Point(14.43 m,-19 m,10 m), Point(14.43 m,19 m,10 m));
DU3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

DL1 = Beam(Point(4 m,19 m,-17 m), Point(-18.47 m,6 m,-17 m));
DL1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

DL2 = Beam(Point(-18.47 m,-6 m,-17 m), Point(4 m,-19 m,-17 m));
DL2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

DL3 = Beam(Point(14.43 m,-13 m,-17 m), Point(14.43 m,13 m,-17 m));
DL3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YU1 = Beam(Point(1.625 m,2.815 m,10 m), Point(11.43 m,19.81 m,10 m));
YU1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YU2 = Beam(Point(-3.25 m,0 m,10 m), Point(-22.87 m,0 m,10 m));
YU2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YU3 = Beam(Point(1.625 m,-2.815 m,10 m), Point(11.43 m,-19.81 m,10 m));
YU3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YL1 = Beam(Point(1.625 m,2.815 m,17 m), Point(8.4 m,14.6 m,-17 m));
YL1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YL2 = Beam(Point(-3.25 m,0 m,-17 m), Point(-16.87 m,0 m,-17 m));
YL2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

YL3 = Beam(Point(1.625 m,-2.815 m,-17 m), Point(8.4 m,-14.6 m,-17 m));
YL3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

CB1 = Beam(Point(1.625 m,2.815 m,-16.2 m), Point(11.43 m,19.81 m,9.13 m));
CB1.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

CB2 = Beam(Point(-3.25 m,0 m,-16.2 m), Point(-22.87 m,0 m,9.13 m));
CB2.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

CB3 = Beam(Point(1.625 m,-2.815 m,-16.2 m), Point(11.43 m,-19.81 m,9.13 m));
CB3.CurveOffset = ReparameterizedBeamCurveOffset(NoCurveOffset());

//***** GUIDING GEOMETRY *****//
//Guiding Geometry
GP_Base = GuidePlane(Point(-10 m,-10 m,10 m), Point(10 m,-10 m,10 m), Point(10 m,10 m,10 m), Point(-10 m,10 m,10 m), 2, 2, 1, 1, 1, 1);
GP_Top = GuidePlane(Point(-10 m,-10 m,87.6 m), Point(10 m,-10 m,87.6 m), Point(10 m,10 m,87.6 m), Point(-10 m,10 m,87.6 m), 2, 2, 1, 1, 1, 1);

//***** ENVIRONMENT *****//
//***** EQUIPMENTS *****//
//***** SETS ( Create ) *****//
//***** LOAD MODELLING AND ANALYSIS *****//
//***** LOAD INTERFACES *****//
//***** MODEL VIEWS *****//
//***** SETS ( Fill ) *****//
